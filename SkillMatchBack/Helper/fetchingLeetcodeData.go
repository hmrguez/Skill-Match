package Helper

import (
	"SkillMatchBack/Data"
	"encoding/json"
	"fmt"
	"net/http"
)

func fetchUserProblems(username string) ([]Data.Problem, error) {
	url := fmt.Sprintf("https://api.leetcode.com/users/%s/acclist", username)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("LeetCode API request failed with status: %s", resp.Status)
	}

	var problems []Data.Problem
	err = json.NewDecoder(resp.Body).Decode(&problems)
	if err != nil {
		return nil, err
	}

	return problems, nil
}

func calculateProblemScore(difficulty string) int {
	switch difficulty {
	case "easy":
		return 50
	case "medium":
		return 100
	case "hard":
		return 200
	default:
		return 0
	}
}

func GetUserWithProblemStats(username string) (*Data.User, error) {
	problems, err := fetchUserProblems(username)
	if err != nil {
		return nil, err
	}

	user := &Data.User{
		Username: username,
		Stats:    make(map[string]int),
	}

	for _, problem := range problems {
		score := calculateProblemScore(problem.Stat.Difficulty)
		user.Stats[problem.Stat.Title] = score
	}

	return user, nil
}
