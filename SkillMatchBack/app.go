package main

import (
	"SkillMatchBack/Helper"
	"fmt"
)

func main() {
	username := "zealot-algo"

	user, err := Helper.GetUserWithProblemStats(username)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("User: %s\n", user.Username)
	fmt.Println("Problem Stats:")
	for problem, score := range user.Stats {
		fmt.Printf("Problem: %s, Score: %d\n", problem, score)
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
