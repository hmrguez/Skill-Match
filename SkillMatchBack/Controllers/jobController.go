package Controllers

import (
	"SkillMatchBack/Data/Models"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func CreateJob(c *gin.Context) {
	var job Models.Job
	if err := c.ShouldBindJSON(&job); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := JobService.CreateJob(context.Background(), job)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create job"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Job created"})
}

func GetJobByID(c *gin.Context) {
	id := c.Param("id")

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Job ID format"})
		return
	}

	job, err := JobService.GetJobByID(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	c.JSON(http.StatusOK, job)
}

func GetAllJobs(c *gin.Context) {
	jobs, err := JobService.GetAllJobs(context.Background())
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Jobs not found"})
		return
	}

	c.JSON(http.StatusOK, jobs)
}

func UpdateJob(c *gin.Context) {
	id := c.Param("id")

	var job Models.Job
	if err := c.ShouldBindJSON(&job); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Job ID format"})
		return
	}

	err = JobService.UpdateJob(context.Background(), objectID, job)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update job"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Job updated"})
}

func DeleteJob(c *gin.Context) {
	id := c.Param("id")

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Job ID format"})
		return
	}

	err = JobService.DeleteJob(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete job"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Job deleted"})
}

func SearchJobs(c *gin.Context) {
	// Extract filter parameters from request, for example, if you pass filters as JSON in the request body.
	var filter bson.M
	if err := c.ShouldBindJSON(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jobs, err := JobService.SearchJobs(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search jobs"})
		return
	}

	c.JSON(http.StatusOK, jobs)
}
