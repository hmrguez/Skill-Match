package Interfaces

import (
	"SkillMatchBack/Data"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CourseRepository interface {
	CreateCourse(course Data.Course) error
	GetCourseByID(courseID primitive.ObjectID) (Data.Course, error)
	UpdateCourse(course Data.Course) error
	DeleteCourse(courseID primitive.ObjectID) error
}
