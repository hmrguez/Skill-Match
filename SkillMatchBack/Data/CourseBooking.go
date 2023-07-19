package Data

import "go.mongodb.org/mongo-driver/bson/primitive"

type CourseBooking struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	CourseId primitive.ObjectID `bson:"courseId,omitempty"`
	UserId   primitive.ObjectID `bson:"userId,omitempty"`
}
