package Interfaces

import (
	"SkillMatchBack/Data"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IExerciseRepository interface {
	CreateExercise(exercise Data.Exercise) (interface{}, error)
	GetExerciseByID(exerciseID primitive.ObjectID) (Data.Exercise, error)
	UpdateExercise(exercise Data.Exercise) error
	DeleteExercise(exerciseID primitive.ObjectID) error
}
