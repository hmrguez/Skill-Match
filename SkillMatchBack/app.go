package main

import (
	"SkillMatchBack/Controllers"
	"github.com/gin-gonic/gin"
	godotenv "github.com/joho/godotenv"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	_ = godotenv.Load()
	r := gin.Default()

	r.Use(cors.Default())
	Controllers.SetupUserService()

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
