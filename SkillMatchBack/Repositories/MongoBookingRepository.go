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

type MongoBookingRepository struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoBookingRepository() (*MongoBookingRepository, error) {
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
	collection := db.Collection("CourseBooking")

	return &MongoBookingRepository{
		client:     client,
		collection: collection,
	}, nil
}

func (repo *MongoBookingRepository) CreateBooking(course Data.CourseBooking) (interface{}, error) {
	res, err := repo.collection.InsertOne(context.Background(), course)
	if err != nil {
		return nil, fmt.Errorf("failed to create course: %v", err)
	}
	return res.InsertedID, nil
}

func (repo *MongoBookingRepository) GetBookingByID(courseID primitive.ObjectID) (Data.CourseBooking, error) {
	var course Data.CourseBooking
	err := repo.collection.FindOne(context.Background(), bson.M{"_id": courseID}).Decode(&course)
	if err != nil {
		return Data.CourseBooking{}, fmt.Errorf("failed to get course: %v", err)
	}
	return course, nil
}

func (repo *MongoBookingRepository) UpdateBooking(course Data.CourseBooking) error {
	filter := bson.M{"_id": course.ID}
	update := bson.M{"$set": course}
	_, err := repo.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("failed to update course: %v", err)
	}
	return nil
}

func (repo *MongoBookingRepository) DeleteBooking(courseID primitive.ObjectID) error {
	_, err := repo.collection.DeleteOne(context.Background(), bson.M{"_id": courseID})
	if err != nil {
		return fmt.Errorf("failed to delete course: %v", err)
	}
	return nil
}
