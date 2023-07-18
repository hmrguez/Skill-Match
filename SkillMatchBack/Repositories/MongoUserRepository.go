package Repositories

import (
	"SkillMatchBack/Data"
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"os"
)

type MongoUserRepository struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoUserRepository() (*MongoUserRepository, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbConnectionString := os.Getenv("DB_CONNECTION_STRING")
	dbName := os.Getenv("DB_NAME")

	clientOptions := options.Client().ApplyURI(dbConnectionString)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MongoDB: %v", err)
	}

	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		return nil, fmt.Errorf("failed to ping MongoDB: %v", err)
	}

	db := client.Database(dbName)
	collection := db.Collection("User")

	return &MongoUserRepository{
		client:     client,
		collection: collection,
	}, nil
}

func (repo *MongoUserRepository) CreateUser(user Data.User) (interface{}, error) {
	res, err := repo.collection.InsertOne(context.Background(), user)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}
	return res.InsertedID, nil
}

func (repo *MongoUserRepository) GetUserByID(userID primitive.ObjectID) (Data.User, error) {
	var user Data.User
	err := repo.collection.FindOne(context.Background(), bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		return Data.User{}, fmt.Errorf("failed to get user: %v", err)
	}
	return user, nil
}

func (repo *MongoUserRepository) GetUserByName(username string) (Data.User, error) {
	var user Data.User
	err := repo.collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		return Data.User{}, fmt.Errorf("failed to get user: %v", err)
	}
	return user, nil
}

func (repo *MongoUserRepository) UpdateUser(user Data.User) error {
	filter := bson.M{"_id": user.ID}
	update := bson.M{"$set": user}
	_, err := repo.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("failed to update user: %v", err)
	}
	return nil
}

func (repo *MongoUserRepository) DeleteUser(userID primitive.ObjectID) error {
	_, err := repo.collection.DeleteOne(context.Background(), bson.M{"_id": userID})
	if err != nil {
		return fmt.Errorf("failed to delete user: %v", err)
	}
	return nil
}
