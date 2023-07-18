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

type MongoExerciseRepository struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoExerciseRepository() (*MongoExerciseRepository, error) {
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
	collection := db.Collection("Exercise")

	return &MongoExerciseRepository{
		client:     client,
		collection: collection,
	}, nil
}

func (repo *MongoExerciseRepository) CreateExercise(exercise Data.Exercise) error {
	_, err := repo.collection.InsertOne(context.Background(), exercise)
	if err != nil {
		return fmt.Errorf("failed to create exercise: %v", err)
	}
	return nil
}

func (repo *MongoExerciseRepository) GetExerciseByID(exerciseID primitive.ObjectID) (Data.Exercise, error) {
	var exercise Data.Exercise
	err := repo.collection.FindOne(context.Background(), bson.M{"_id": exerciseID}).Decode(&exercise)
	if err != nil {
		return Data.Exercise{}, fmt.Errorf("failed to get exercise: %v", err)
	}
	return exercise, nil
}

func (repo *MongoExerciseRepository) UpdateExercise(exercise Data.Exercise) (interface{}, error) {
	filter := bson.M{"_id": exercise.ID}
	update := bson.M{"$set": exercise}
	res, err := repo.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return nil, fmt.Errorf("failed to update exercise: %v", err)
	}
	return res, nil
}

func (repo *MongoExerciseRepository) DeleteExercise(exerciseID primitive.ObjectID) error {
	_, err := repo.collection.DeleteOne(context.Background(), bson.M{"_id": exerciseID})
	if err != nil {
		return fmt.Errorf("failed to delete exercise: %v", err)
	}
	return nil
}
