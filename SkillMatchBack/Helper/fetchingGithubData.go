package Helper

import (
	"SkillMatchBack/Data"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func fetchUserRepositories(username string, token string) ([]string, error) {
	client := &http.Client{}
	url := fmt.Sprintf("https://api.github.com/users/%s/repos", username)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Authorization", "Bearer "+token)

	resp, err := client.Do(req)

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API request failed with status: %s", resp.Status)
	}

	var repositories []struct {
		Name string `json:"name"`
	}
	err = json.NewDecoder(resp.Body).Decode(&repositories)
	if err != nil {
		return nil, err
	}

	repoNames := make([]string, len(repositories))
	for i, repo := range repositories {
		repoNames[i] = repo.Name
	}

	return repoNames, nil
}

func fetchLanguageStats(username, repoName string, token string) (Data.LanguageStats, error) {
	client := &http.Client{}
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/languages", username, repoName)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Authorization", "Bearer "+token)

	resp, err := client.Do(req)
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API request failed with status: %s", resp.Status)
	}

	var stats Data.LanguageStats
	err = json.NewDecoder(resp.Body).Decode(&stats)
	if err != nil {
		return nil, err
	}

	return stats, nil
}

func getTotalLanguageStats(username string, token string) (Data.LanguageStats, error) {
	repoNames, err := fetchUserRepositories(username, token)
	if err != nil {
		return nil, err
	}

	totalStats := make(Data.LanguageStats)
	for _, repoName := range repoNames {
		stats, err := fetchLanguageStats(username, repoName, token)
		if err != nil {
			return nil, err
		}

		for lang, bytes := range stats {
			totalStats[lang] += bytes / 50
		}
	}

	return totalStats, nil
}

func AttachGithubStatsToUser(user *Data.User, token string) {
	totalStats, err := getTotalLanguageStats(user.Name, token)

	if err != nil {
		panic(err)
	}

	user.SkillSources = append(user.SkillSources, Data.SkillSource{Name: "Github", Skills: totalStats})
}
