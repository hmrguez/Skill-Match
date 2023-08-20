package Data

type Problem struct {
	Stat struct {
		QuestionID int    `json:"question_id"`
		Title      string `json:"question__title"`
		Difficulty string `json:"difficulty"`
	} `json:"stat"`
}
