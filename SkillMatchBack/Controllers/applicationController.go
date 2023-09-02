package Controllers

import (
	"SkillMatchBack/Data/DTOs"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func CreateApplication(c *gin.Context) {
	var applicationDto DTOs.ApplicationDto
	if err := c.ShouldBindJSON(&applicationDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := UserService.GetUserByName(context.Background(), applicationDto.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(applicationDto.JobId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Job ID format"})
		return
	}

	job, err := JobService.GetJobByID(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	user.JobsAppliedIds = append(user.JobsAppliedIds, applicationDto.JobId)
	job.ApplicantUsernames = append(job.ApplicantUsernames, applicationDto.Username)

	err = JobService.UpdateJob(context.Background(), objectID, job)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update job"})
		return
	}

	err = UserService.UpdateUser(context.Background(), applicationDto.Username, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application created"})
}

func DeleteApplication(c *gin.Context) {
	var applicationDto DTOs.ApplicationDto
	if err := c.ShouldBindJSON(&applicationDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := UserService.GetUserByName(context.Background(), applicationDto.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(applicationDto.JobId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Job ID format"})
		return
	}

	job, err := JobService.GetJobByID(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	// Update Job
	var newJobApplicants []string
	for _, element := range job.ApplicantUsernames {
		if element != applicationDto.Username {
			newJobApplicants = append(newJobApplicants, element)
		}
	}
	job.ApplicantUsernames = newJobApplicants

	err = JobService.UpdateJob(context.Background(), objectID, job)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update job"})
		return
	}

	// Update User
	var newUserApplications []string
	for _, element := range user.JobsAppliedIds {
		if element != applicationDto.JobId {
			newUserApplications = append(newUserApplications, element)
		}
	}
	user.JobsAppliedIds = newUserApplications
	err = UserService.UpdateUser(context.Background(), applicationDto.Username, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application deleted"})
}
