package Models

// Job represents a job listing with MongoDB support.
type Job struct {
	Title        string        `bson:"title"`
	Description  string        `bson:"description"`
	Company      string        `bson:"company"`
	Location     string        `bson:"location"`
	Requirements []Requirement `bson:"requirements"`
}

// Requirement represents the skill requirements for a job.
type Requirement struct {
	Skill string `bson:"skill"`
	Min   int    `bson:"min"`
	Max   int    `bson:"max"`
}
