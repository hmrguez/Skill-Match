package Services

import (
	"SkillMatchBack/Data/Models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type JobService struct {
	collection *mongo.Collection
}

func NewJobService(database *mongo.Database) *JobService {
	collection := database.Collection("jobs")
	return &JobService{collection: collection}
}

func (s *JobService) CreateJob(ctx context.Context, job Models.Job) error {
	_, err := s.collection.InsertOne(ctx, job)
	if err != nil {
		log.Println("Failed to insert job:", err)
	}
	return err
}

func (s *JobService) GetJobByID(ctx context.Context, id primitive.ObjectID) (Models.Job, error) {
	var job Models.Job
	err := s.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&job)
	if err != nil {
		log.Println("Failed to get job:", err)
	}
	return job, err
}

func (s *JobService) GetAllJobs(ctx context.Context) ([]Models.Job, error) {
	var jobs []Models.Job
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
		var job Models.Job
		if err := cursor.Decode(&job); err != nil {
			return nil, err
		}
		jobs = append(jobs, job)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return jobs, nil
}

func (s *JobService) UpdateJob(ctx context.Context, id primitive.ObjectID, job Models.Job) error {
	_, err := s.collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": job})
	if err != nil {
		log.Println("Failed to update job:", err)
	}
	return err
}

func (s *JobService) DeleteJob(ctx context.Context, id primitive.ObjectID) error {
	_, err := s.collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		log.Println("Failed to delete job:", err)
	}
	return err
}

func (s *JobService) SearchJobs(ctx context.Context, filter bson.M) ([]Models.Job, error) {
	var jobs []Models.Job
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
		var job Models.Job
		if err := cursor.Decode(&job); err != nil {
			return nil, err
		}
		jobs = append(jobs, job)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return jobs, nil
}
