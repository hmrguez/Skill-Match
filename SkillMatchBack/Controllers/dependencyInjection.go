package Controllers

import (
	"SkillMatchBack/Services"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

var UserService *Services.UserService

func SetupUserService() {
	connectionString := os.Getenv("DB_CONNECTION_STRING")
	databaseName := os.Getenv("DB_NAME")

	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		panic(err)
	}

	database := client.Database(databaseName)
	UserService = Services.NewUserService(database)
}
