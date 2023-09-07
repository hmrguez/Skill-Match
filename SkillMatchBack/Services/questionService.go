package Services

import (
	"SkillMatchBack/Data/Models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type QuestionService struct {
	collection *mongo.Collection
}

func NewQuestionService(database *mongo.Database) *QuestionService {
	collection := database.Collection("questions")
	return &QuestionService{collection: collection}
}

func (s *QuestionService) CreateQuestion(ctx context.Context, question Models.MultipleChoiceQuestion) error {
	_, err := s.collection.InsertOne(ctx, question)
	if err != nil {
		log.Println("Failed to insert question:", err)
	}
	return err
}

func (s *QuestionService) GetQuestionByID(ctx context.Context, id primitive.ObjectID) (Models.MultipleChoiceQuestion, error) {
	var question Models.MultipleChoiceQuestion
	err := s.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&question)
	if err != nil {
		log.Println("Failed to get question:", err)
	}
	return question, err
}

func (s *QuestionService) GetAllQuestions(ctx context.Context) ([]Models.MultipleChoiceQuestion, error) {
	var questions []Models.MultipleChoiceQuestion
	cursor, err := s.collection.Find(ctx, bson.M{})
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
		var question Models.MultipleChoiceQuestion
		if err := cursor.Decode(&question); err != nil {
			return nil, err
		}
		questions = append(questions, question)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return questions, nil
}

func (s *QuestionService) UpdateQuestion(ctx context.Context, id primitive.ObjectID, question Models.MultipleChoiceQuestion) error {
	_, err := s.collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": question})
	if err != nil {
		log.Println("Failed to update question:", err)
	}
	return err
}

func (s *QuestionService) DeleteQuestion(ctx context.Context, id primitive.ObjectID) error {
	_, err := s.collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		log.Println("Failed to delete question:", err)
	}
	return err
}

func (s *QuestionService) SearchQuestions(ctx context.Context, filter bson.M) ([]Models.MultipleChoiceQuestion, error) {
	var questions []Models.MultipleChoiceQuestion
	cursor, err := s.collection.Find(ctx, filter)

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
		var question Models.MultipleChoiceQuestion
		if err := cursor.Decode(&question); err != nil {
			return nil, err
		}
		questions = append(questions, question)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return questions, nil
}
