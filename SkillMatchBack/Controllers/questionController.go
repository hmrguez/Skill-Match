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

func CreateQuestion(c *gin.Context) {
	var question Models.MultipleChoiceQuestion
	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := QuestionService.CreateQuestion(context.Background(), question)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create question"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Question created"})
}

func GetQuestionByID(c *gin.Context) {
	id := c.Param("id")

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Question ID format"})
		return
	}

	question, err := QuestionService.GetQuestionByID(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Question not found"})
		return
	}

	c.JSON(http.StatusOK, question)
}

func GetAllQuestions(c *gin.Context) {
	questions, err := QuestionService.GetAllQuestions(context.Background())
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Questions not found"})
		return
	}

	c.JSON(http.StatusOK, questions)
}

func UpdateQuestion(c *gin.Context) {
	id := c.Param("id")

	var question Models.MultipleChoiceQuestion
	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Question ID format"})
		return
	}

	err = QuestionService.UpdateQuestion(context.Background(), objectID, question)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update question"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Question updated"})
}

func DeleteQuestion(c *gin.Context) {
	id := c.Param("id")

	// Parse the ID parameter into a MongoDB ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Question ID format"})
		return
	}

	err = QuestionService.DeleteQuestion(context.Background(), objectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete question"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Question deleted"})
}

func SearchQuestions(c *gin.Context) {
	// Extract filter parameters from request, for example, if you pass filters as JSON in the request body.
	var filter bson.M
	if err := c.ShouldBindJSON(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	questions, err := QuestionService.SearchQuestions(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search questions"})
		return
	}

	fmt.Printf("Result: %v\n", questions)

	c.JSON(http.StatusOK, questions)
}
