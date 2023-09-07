package Models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MultipleChoiceQuestion struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Skill    string             `bson:"skill"`
	Question string             `bson:"question"`
	Answer   string             `bson:"answer"`
	Choices  []string           `bson:"choices"`
}
