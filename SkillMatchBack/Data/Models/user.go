package Models

import "go.mongodb.org/mongo-driver/bson/primitive"

type LanguageStats map[string]int

type SkillSource struct {
	Name   string         `bson:"name"`
	Skills map[string]int `bson:"skills"`
}

type Project struct {
	Name        string   `bson:"name"`
	Url         string   `bson:"url"`
	Description string   `bson:"description"`
	Skills      []string `bson:"Skills"`
}

type Certification struct {
	Name      string        `bson:"name"`
	Issuer    string        `bson:"issuer"`
	IssueDate string        `bson:"issueDate"`
	Url       string        `bson:"url"`
	Skills    LanguageStats `bson:"skills"`
}

type WorkExperience struct {
	Title       string `bson:"title"`
	Company     string `bson:"company"`
	Description string `bson:"description"`
	StartDate   string `bson:"startDate"`
	EndDate     string `bson:"endDate"`
}

type User struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	Plus            bool               `bson:"plus"`
	Name            string             `bson:"name"`
	Streak          int                `bson:"streak"`
	LongestStreak   int                `bson:"longestStreak"`
	Email           string             `bson:"email"`
	DailyChallenge  bool               `bson:"dailyChallenge"`
	Summary         string             `bson:"summary"`
	Projects        []Project          `bson:"projects"`
	GithubProfile   string             `bson:"githubProfile"`
	Certifications  []Certification    `bson:"certifications"`
	HashedPassword  string             `bson:"hashedPassword"`
	SkillSources    []SkillSource      `bson:"skillSources"`
	TotalSkills     map[string]int     `bson:"totalSkills"`
	JobsAppliedIds  []string           `bson:"applications"`
	WorkExperiences []WorkExperience   `bson:"workExperiences"`
	Sponsored       []string           `bson:"sponsored"`
}
