package Interfaces

import (
	"SkillMatchBack/Data"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ILessonRepository interface {
	CreateLesson(lesson Data.Lesson) (interface{}, error)
	GetLessonByID(lessonID primitive.ObjectID) (Data.Lesson, error)
	UpdateLesson(lesson Data.Lesson) error
	DeleteLesson(lessonID primitive.ObjectID) error
}
