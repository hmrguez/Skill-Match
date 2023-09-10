package Controllers

import (
	"SkillMatchBack/Data/Models"
	"context"
	"fmt"
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

	title := c.Query("title")
	description := c.Query("description")
	location := c.Query("location")
	salary := c.Query("salary")
	company := c.Query("company")

	fmt.Printf("Filter: %s\n", title)
	fmt.Printf("Filter: %s\n", description)
	fmt.Printf("Filter: %s\n", location)
	fmt.Printf("Filter: %s\n", salary)

	var requirements []Models.Requirement
	err := c.ShouldBindJSON(&requirements)

	filter := createFilter(title, description, location, salary, company, requirements)
	fmt.Printf("Filter: %v\n", filter)
	jobs, err := JobService.SearchJobs(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search jobs"})
		return
	}

	c.JSON(http.StatusOK, jobs)
}

func createFilter(title, description, location, salary, company string, requirements []Models.Requirement) bson.M {
	filter := bson.M{}

	// Title, Description, Location, Salary, and Company filters
	if title != "" {
		filter["title"] = primitive.Regex{Pattern: title, Options: "i"} // Case-insensitive regex for title
	}

	if description != "" {
		filter["description"] = primitive.Regex{Pattern: description, Options: "i"} // Case-insensitive regex for description
	}

	if location != "" {
		filter["location"] = primitive.Regex{Pattern: location, Options: "i"} // Case-insensitive regex for location
	}

	if salary != "" {
		filter["salary"] = primitive.Regex{Pattern: salary, Options: "i"} // Case-insensitive regex for salary
	}

	if company != "" {
		filter["company"] = primitive.Regex{Pattern: company, Options: "i"} // Case-insensitive regex for company
	}

	// Requirements filter
	var requirementFilters []bson.M
	for _, req := range requirements {
		reqFilter := bson.M{
			"requirements.skill": req.Skill,
			"requirements.min":   bson.M{"$gte": req.Min},
			"requirements.max":   bson.M{"$lt": req.Max},
		}
		requirementFilters = append(requirementFilters, reqFilter)
	}

	if len(requirementFilters) > 0 {
		filter["$and"] = requirementFilters
	}

	return filter
}
