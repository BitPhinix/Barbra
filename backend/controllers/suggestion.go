package controllers

import (
	"github.com/gin-gonic/gin"
	"fmt"
	"net/http"
	"os/exec"
	"../config"
	"encoding/json"
	"../models"
)

type Suggestion struct{}

func (Suggestion) GetSuggestions(c *gin.Context) {
	query := fmt.Sprint(c.Query("query"))
	cnfig := config.GetConfig()

	if len(query) < 5 {
		RespondError(c, http.StatusBadRequest, "Invalid query string!")
		return
	}

	cmd := exec.Command("python3", cnfig.GetString("nlp.script_location"))
	out, err := cmd.Output()

	if err != nil {
		RespondError(c, http.StatusBadRequest, err.Error())
		return
	}

	var suggestions []*models.Suggestion
	err = json.Unmarshal(out, &suggestions)

	if err != nil {
		RespondError(c, http.StatusBadRequest, "Unable to start npl layer!")
		return
	}

	for _, suggestion := range suggestions {
		suggestion.SetId()
	}

	c.JSON(http.StatusOK, suggestions)
}
