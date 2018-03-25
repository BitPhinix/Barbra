package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
	"strconv"
	"../payloads"
	"../models"
)

type Bookmark struct{}

func (Bookmark) GetTopics(c *gin.Context) {
	user := GetCurrentUser(c)

	if user == nil {
		return
	}

	topics, err := user.GetBookmarkTopics();

	if err != nil {
		RespondError(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, topics)
}

func (Bookmark) GetBookmarks(c *gin.Context) {
	user := GetCurrentUser(c)

	if user == nil {
		return
	}

	count := fmt.Sprint(c.Query("count"))

	if count != "" {
		count, err := strconv.ParseUint(count, 10, 32)

		if err != nil {
			RespondError(c, http.StatusBadRequest, "Invalid count!")
			return
		}

		bookmarks, err := user.GetBookmarks(int(count))
		c.JSON(http.StatusOK, bookmarks)
	} else {
		topic := c.Query("topic")

		if topic == "" {
			RespondError(c, http.StatusBadRequest, "Topic not defined!")
			return
		}

		bookmarks, err := user.GetBookmarksByTopic(topic);
		if err != nil {
			RespondError(c, http.StatusBadRequest, "No bookmarks found!")
			return
		}

		c.JSON(http.StatusOK, bookmarks)
	}
}

func (Bookmark) AddBookmark(c *gin.Context) {
	payload := new(payloads.BookmarkPayload)
	err := BindJson(c, payload)

	if err != nil {
		return
	}

	user := GetCurrentUser(c)

	if err != nil {
		return
	}

	suggestion, err := models.GetSuggestion(payload.SuggestionId)

	if err != nil {
		RespondError(c, http.StatusBadRequest, "Suggestion not found!")
		return
	}

	suggestion.Bookmark(user)
}

func (Bookmark) DeleteBookmark(c *gin.Context) {
	payload := new(payloads.BookmarkPayload)
	err := BindJson(c, payload)

	if err != nil {
		return
	}

	user := GetCurrentUser(c)

	if user == nil {
		return
	}

	err = user.RemoveBookmark(payload.SuggestionId)

	if err != nil {
		RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
}
