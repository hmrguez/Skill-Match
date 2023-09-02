package Models

import "go.mongodb.org/mongo-driver/bson/primitive"

type LanguageStats map[string]int

type SkillSource struct {
	Name   string         `bson:"name"`
	Skills map[string]int `bson:"skills"`
}

type Repo struct {
	Name        string        `bson:"name"`
	Description string        `bson:"description"`
	Languages   LanguageStats `bson:"languages"`
}

type User struct {
	ID             primitive.ObjectID `bson:"_id,omitempty"`
	Name           string             `bson:"name"`
	GithubProfile  string             `bson:"githubProfile"`
	GithubRepos    []Repo             `bson:"githubRepos"`
	HashedPassword string             `bson:"hashedPassword"`
	SkillSources   []SkillSource      `bson:"skillSources"`
	TotalSkills    map[string]int     `bson:"totalSkills"`
	JobsAppliedIds []string           `bson:"applications"`
}
