package main

import (
	"SkillMatchBack/Controllers"
	"SkillMatchBack/Middleware"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	cors "github.com/rs/cors/wrapper/gin"
	"net/http"
)

func main() {
	_ = godotenv.Load()
	r := gin.Default()

	r.Use(cors.Default())
	Controllers.SetupUserService()

	// Account
	r.POST("/register", Controllers.RegisterHandler)
	r.POST("/login", Controllers.LoginHandler)

	// Authenticated route
	authGroup := r.Group("/auth")
	authGroup.Use(Middleware.AuthMiddleware())
	{
		authGroup.GET("/protected", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "You have access to this protected route"})
		})
	}

	// Users
	r.GET("/users", Controllers.GetUsers)
	r.POST("/users", Controllers.CreateUser)
	r.GET("/users/:name", Controllers.GetUserByName)
	r.PUT("/users/:name", Controllers.UpdateUser)
	r.DELETE("/users/:name", Controllers.DeleteUser)

	err := r.Run(":7000")
	if err != nil {
		panic("Server was not able to start")
		return
	}
}
