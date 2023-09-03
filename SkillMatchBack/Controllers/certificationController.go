package Controllers

import (
	"SkillMatchBack/Data/Models"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateCertification(c *gin.Context) {
	var certification Models.Certification

	if err := c.ShouldBindJSON(&certification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	username := c.Param("username")

	println(username)

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
