package Interfaces

import (
	"SkillMatchBack/Data"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IUserRepository interface {
	CreateUser(user Data.User) (interface{}, error)
	GetUserByID(userID primitive.ObjectID) (Data.User, error)
	GetUserByName(username string) (Data.User, error)
	UpdateUser(user Data.User) error
	DeleteUser(userID primitive.ObjectID) error
}
