package Data

import "go.mongodb.org/mongo-driver/bson/primitive"

type Course struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Title  string             `json:"title"`
	Author string             `json:"author"`
	Topics []string           `json:"topics"`
}
