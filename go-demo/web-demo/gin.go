package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("books", func(context *gin.Context) {
		context.String(http.StatusOK, "Hello world")
	})
	router.Run(":8080")
}
