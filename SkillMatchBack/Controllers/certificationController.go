package Controllers

import (
	"SkillMatchBack/Data/Models"
	"SkillMatchBack/Helper"
	"context"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
)

func UploadCertification(c *gin.Context) {
	Name := c.Query("Name")
	Issuer := c.Query("Issuer")
	IssueDate := c.Query("IssueDate")
	Skills := c.QueryArray("Skills")
	Username := c.Param("username")

	// Retrieve the uploaded file
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error getting file header": err.Error()})
		return
	}

	// Create a temporary directory to store the uploaded file
	tempDir := "./uploads" // Change this path as needed
	if err := os.MkdirAll(tempDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error creating temp directory": err.Error()})
		return
	}

	// Save the uploaded file to the temporary directory
	tempFilePath := filepath.Join(tempDir, fileHeader.Filename)
	if err := c.SaveUploadedFile(fileHeader, tempFilePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error saving uploaded file": err.Error()})
		return
	}

	// Read the file content into a byte slice
	fileContent, err := ioutil.ReadFile(tempFilePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error reading file content": err.Error()})
		return
	}

	// Create an email template with the file content
	emailTemplate := Helper.GenerateEmailTemplate(Username, Name, Issuer, IssueDate, Skills)

	// Send the email with the file content
	emailAddress := os.Getenv("COMPANY_EMAIL")
	err = EmailService.SendWithAttachment(emailAddress, emailAddress, "New Certification Validation Request", emailTemplate, fileContent, fileHeader.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error sending email": err.Error()})
		return
	}

	// Delete the temporary file
	if err := os.Remove(tempFilePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error deleting temp file": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Certification uploaded successfully"})
}

func CreateCertification(c *gin.Context) {
	var certification Models.Certification

	if err := c.ShouldBindJSON(&certification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	username := c.Param("username")
	user, err := UserService.GetUserByName(context.Background(), username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.Certifications = append(user.Certifications, certification)
	err = UserService.UpdateUser(context.Background(), username, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Certification created for " + username})
}

func createTempFile(name string) (*os.File, error) {
	tempDir := os.TempDir()
	tempFile, err := os.Create(filepath.Join(tempDir, name))
	if err != nil {
		return nil, err
	}
	return tempFile, nil
}
