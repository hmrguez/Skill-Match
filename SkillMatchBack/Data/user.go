package Data

import "go.mongodb.org/mongo-driver/bson/primitive"

type LanguageStats map[string]int

type SkillSource struct {
	Name   string         `bson:"name"`
	Skills map[string]int `bson:"skills"`
}

type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	Name         string             `bson:"name"`
	SkillSources []SkillSource      `bson:"skillSources"`
	TotalSkills  map[string]int     `bson:"totalSkills"`
}
