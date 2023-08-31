package Controllers

import (
	"SkillMatchBack/Data/DTOs"
	"SkillMatchBack/Data/Models"
	"SkillMatchBack/Helper"
	"context"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"time"
)

func RegisterHandler(c *gin.Context) {
	var userSign DTOs.UserSignDto
	if err := c.ShouldBindJSON(&userSign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := Helper.HashPassword(userSign.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	var user Models.User
	user.Name = userSign.Name
	user.HashedPassword = hashedPassword
	user.SkillSources = make([]Models.SkillSource, 0)

	err = UserService.CreateUser(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

func LoginHandler(c *gin.Context) {
	var userSign DTOs.UserSignDto
	if err := c.ShouldBindJSON(&userSign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := UserService.GetUserByName(context.Background(), userSign.Name)

	err = Helper.ComparePasswords(user.HashedPassword, userSign.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	var tokenString string
	var secretKey = os.Getenv("PASSWORD_KEY")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username":   user.Name,
		"expiration": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err = token.SignedString([]byte(secretKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
