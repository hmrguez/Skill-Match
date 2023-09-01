package Services

import (
	"SkillMatchBack/Data/Models"
	"SkillMatchBack/Helper"
	"context"
	"fmt"
	"log"
	"os"

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

func (s *UserService) CreateUser(ctx context.Context, user Models.User) error {

	if user.GithubProfile != "" {
		token := os.Getenv("GITHUB_PAT")
		Helper.AttachGithubStatsToUser(&user, token)
	}

	user.TotalSkills = Helper.CalculateTotalSkills(user.SkillSources)
	_, err := s.collection.InsertOne(ctx, user)
	if err != nil {
		log.Println("Failed to insert user:", err)
	}
	return err
}

func (s *UserService) GetUserByName(ctx context.Context, name string) (Models.User, error) {
	var user Models.User
	err := s.collection.FindOne(ctx, bson.M{"name": name}).Decode(&user)
	if err != nil {
		log.Println("Failed to get user:", err)
	}
	return user, err
}

func (s *UserService) GetAllUsers(ctx context.Context) ([]Models.User, error) {
	var users []Models.User
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

	for cursor.Next(ctx) {
		var user Models.User
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func (s *UserService) UpdateUser(ctx context.Context, name string, user Models.User) error {
	if user.GithubProfile != "" {
		token := os.Getenv("GITHUB_PAT")
		Helper.AttachGithubStatsToUser(&user, token)
	}

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
