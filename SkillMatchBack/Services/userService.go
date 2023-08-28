package Services

import (
	"SkillMatchBack/Data"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	collection *mongo.Collection
}

func NewUserService(database *mongo.Database) *UserService {
	collection := database.Collection("users")
	return &UserService{collection: collection}
}

func (s *UserService) CreateUser(ctx context.Context, user Data.User) error {
	_, err := s.collection.InsertOne(ctx, user)
	if err != nil {
		log.Println("Failed to insert user:", err)
	}
	return err
}

func (s *UserService) GetUserByName(ctx context.Context, name string) (Data.User, error) {
	var user Data.User
	err := s.collection.FindOne(ctx, bson.M{"name": name}).Decode(&user)
	if err != nil {
		log.Println("Failed to get user:", err)
	}
	return user, err
}

func (s *UserService) UpdateUser(ctx context.Context, name string, user Data.User) error {
	_, err := s.collection.UpdateOne(ctx, bson.M{"name": name}, bson.M{"$set": user})
	if err != nil {
		log.Println("Failed to update user:", err)
	}
	return err
}

func (s *UserService) DeleteUser(ctx context.Context, name string) error {
	_, err := s.collection.DeleteOne(ctx, bson.M{"name": name})
	if err != nil {
		log.Println("Failed to delete user:", err)
	}
	return err
}
