package main

import (
	"SkillMatchBack/Controllers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	_ = godotenv.Load()
	r := gin.Default()

	r.Use(cors.AllowAll())
	Controllers.SetupServices()

	// Account
	r.POST("/register", Controllers.RegisterHandler)
	r.POST("/login", Controllers.LoginHandler)

	//// Authenticated route example
	//authGroup := r.Group("/auth")
	//authGroup.Use(Middleware.AuthMiddleware())
	//{
	//	authGroup.GET("/protected", func(c *gin.Context) {
	//		c.JSON(http.StatusOK, gin.H{"message": "You have access to this protected route"})
	//	})
	//}

	// Users
	r.GET("/users", Controllers.GetUsers)
	r.POST("/users", Controllers.CreateUser)
	r.GET("/users/:name", Controllers.GetUserByName)
	r.PUT("/users/:name", Controllers.UpdateUser)
	r.DELETE("/users/:name", Controllers.DeleteUser)

	// Jobs
	r.GET("/jobs", Controllers.GetAllJobs)
	r.POST("/jobs/search", Controllers.SearchJobs)
	r.POST("/jobs", Controllers.CreateJob)
	r.GET("/jobs/:id", Controllers.GetJobByID)
	r.PUT("/jobs/:id", Controllers.UpdateJob)
	r.DELETE("/jobs/:id", Controllers.DeleteJob)

	// Application
	r.POST("/application", Controllers.CreateApplication)
	r.POST("/application/delete", Controllers.DeleteApplication)

	// Certification
	r.POST("/certification/:username", Controllers.CreateCertification)

	err := r.Run(":7000")
	if err != nil {
		panic("Server was not able to start")
		return
	}
}
