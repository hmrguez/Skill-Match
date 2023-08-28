package main

import (
	"SkillMatchBack/Data"
	"SkillMatchBack/Helper"
	"github.com/joho/godotenv"
	"os"
)

func main() {

	godotenv.Load()
	token := os.Getenv("GITHUB_PAT")
	user := Data.User{Name: "hmrguez", SkillSources: make([]Data.SkillSource, 0)}
	Helper.AttachGithubStatsToUser(&user, token)

	println(user.Name)

	for _, skillSource := range user.SkillSources {
		println(skillSource.Name)
		for skill, level := range skillSource.Skills {
			println(skill, level)
		}
	}

	//router := gin.Default()
	//
	//if err != nil {
	//	panic(fmt.Errorf("An error occurred when loading secret data: %v", err))
	//}
	//
	//router.GET("/github-score/:username", GetGithubData)
	//router.Run("localhost:7000")
}

//func GetGithubData(c *gin.Context) {
//	username := c.Param("username")
//	token := os.Getenv("GITHUB_PAT")
//
//	user, err := Helper.GetUserWithGithubStats(username, token)
//	if err != nil {
//		panic(fmt.Errorf("An error occurred fetching user data: %v", err))
//	}
//
//	c.JSON(200, user)
//}
