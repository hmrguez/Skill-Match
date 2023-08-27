package main

import (
	"SkillMatchBack/Helper"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
)

func main() {
	router := gin.Default()

	err := godotenv.Load()
	if err != nil {
		panic(fmt.Errorf("An error occurred when loading secret data: %v", err))
	}

	router.GET("/github-score/:username", GetGithubData)
	router.Run("localhost:7000")
}

func GetGithubData(c *gin.Context) {
	username := c.Param("username")
	token := os.Getenv("GITHUB_PAT")

	user, err := Helper.GetUserWithGithubStats(username, token)
	if err != nil {
		panic(fmt.Errorf("An error occurred fetching user data: %v", err))
	}

	c.JSON(200, user)
}
