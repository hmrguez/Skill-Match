package Controllers

import (
	"SkillMatchBack/Services"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

var UserService *Services.UserService
var JobService *Services.JobService
var EmailService *Services.EmailService
var QuestionService *Services.QuestionService

func SetupServices() {
	connectionString := os.Getenv("DB_CONNECTION_STRING")
	databaseName := os.Getenv("DB_NAME")

	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		panic(err)
	}

	database := client.Database(databaseName)
	UserService = Services.NewUserService(database)
	JobService = Services.NewJobService(database)
	QuestionService = Services.NewQuestionService(database)
	EmailService = Services.NewEmailService()
}
