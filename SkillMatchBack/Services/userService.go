package Services

import (
	"SkillMatchBack/Data"
	"SkillMatchBack/Helper"
	"context"
	"fmt"
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

	user.TotalSkills = Helper.CalculateTotalSkills(user.SkillSources)
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

func (s *UserService) GetAllUsers(ctx context.Context) ([]Data.User, error) {
	var users []Data.User
	cursor, err := s.collection.Find(ctx, bson.M{})
	fmt.Printf("After find")
	if err != nil {
		return nil, err
	}
	defer func(cursor *mongo.Cursor, ctx context.Context) {
		err := cursor.Close(ctx)
		if err != nil {
			return
		}
	}(cursor, ctx)

	fmt.Printf("Before cursor")

	for cursor.Next(ctx) {
		var user Data.User
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	fmt.Printf("After for cursor")

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func (s *UserService) UpdateUser(ctx context.Context, name string, user Data.User) error {
	user.TotalSkills = Helper.CalculateTotalSkills(user.SkillSources)
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
