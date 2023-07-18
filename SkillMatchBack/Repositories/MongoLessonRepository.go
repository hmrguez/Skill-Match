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

type MongoLessonRepository struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoLessonRepository() (*MongoLessonRepository, error) {
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
	collection := db.Collection("Lesson")

	return &MongoLessonRepository{
		client:     client,
		collection: collection,
	}, nil
}

func (repo *MongoLessonRepository) CreateLesson(lesson Data.Lesson) (interface{}, error) {
	res, err := repo.collection.InsertOne(context.Background(), lesson)
	if err != nil {
		return nil, fmt.Errorf("failed to create lesson: %v", err)
	}
	return res, nil
}

func (repo *MongoLessonRepository) GetLessonByID(lessonID primitive.ObjectID) (Data.Lesson, error) {
	var lesson Data.Lesson
	err := repo.collection.FindOne(context.Background(), bson.M{"_id": lessonID}).Decode(&lesson)
	if err != nil {
		return Data.Lesson{}, fmt.Errorf("failed to get lesson: %v", err)
	}
	return lesson, nil
}

func (repo *MongoLessonRepository) UpdateLesson(lesson Data.Lesson) error {
	filter := bson.M{"_id": lesson.ID}
	update := bson.M{"$set": lesson}
	_, err := repo.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("failed to update lesson: %v", err)
	}
	return nil
}

func (repo *MongoLessonRepository) DeleteLesson(lessonID primitive.ObjectID) error {
	_, err := repo.collection.DeleteOne(context.Background(), bson.M{"_id": lessonID})
	if err != nil {
		return fmt.Errorf("failed to delete lesson: %v", err)
	}
	return nil
}
