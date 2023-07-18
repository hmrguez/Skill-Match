package Data

import "go.mongodb.org/mongo-driver/bson/primitive"

type Lesson struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	CourseID primitive.ObjectID `bson:"course_id,omitempty"`
	Title    string
	SubType  string
	Details  map[string]interface{} `bson:"details,omitempty"`
}
