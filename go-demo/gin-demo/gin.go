package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("books", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"message":   "Hello world",
			"isSuccess": true,
		})
	})
	router.Run(":8080")
}
