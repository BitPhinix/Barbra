package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Profile struct {}

func (profile Profile) GetAccount(c *gin.Context) {
	user := GetCurrentUser(c)

	if user == nil {
		return
	}

	c.JSON(http.StatusOK, user)
}
