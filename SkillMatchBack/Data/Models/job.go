package Models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Job represents a job listing with MongoDB support.
type Job struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty"`
	Title              string             `bson:"title"`
	Description        string             `bson:"description"`
	Company            string             `bson:"company"`
	Location           string             `bson:"location"`
	Salary             string             `bson:"salary"`
	Requirements       []Requirement      `bson:"requirements"`
	ApplicantUsernames []string           `bson:"applicantUsernames"`
}

// Requirement represents the skill requirements for a job.
type Requirement struct {
	Skill string `bson:"skill"`
	Min   int    `bson:"min"`
	Max   int    `bson:"max"`
}
