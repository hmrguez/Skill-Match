package main

import (
	"SkillMatchBack/Helper"
	"fmt"
)

func main() {
	token := "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"
	username := "hmrguez"

	user, err := Helper.GetUserWithGithubStats(username, token)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("User: %s\n", user.Username)
	for lang, bytes := range user.Stats {
		fmt.Printf("Language: %s, Bytes of Code: %d\n", lang, bytes)
	}
}

//package main
//
//import (
//	"github.com/gin-gonic/gin"
//	"net/http"
//)
//
//func main() {
//	router := gin.Default()
//	router.GET("/temp", GetData)
//	router.Run("localhost:7000")
//}
//
//func GetData(c *gin.Context) {
//	var wqre = []string{"asda", "asaaa"}
//	c.IndentedJSON(http.StatusOK, wqre)
//}
