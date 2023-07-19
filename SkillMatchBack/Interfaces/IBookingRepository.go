package Interfaces

import (
	"SkillMatchBack/Data"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IBookingRepository interface {
	CreateCourse(course Data.CourseBooking) (interface{}, error)
	GetBookingByID(courseID primitive.ObjectID) (Data.CourseBooking, error)
	UpdateBooking(course Data.CourseBooking) error
	DeleteBooking(courseID primitive.ObjectID) error
}
