package models

import (
	"time"
	"GoBackend/db"
	"gopkg.in/mgo.v2/bson"
)

type BookmarkPayload struct {
	Suggestion
	Bookmark
}

type Bookmark struct {
	UserId   string    `json:"-" bson:"user_id"`
	Creation time.Time `json:"creation" bson:"creation"`
}

func (suggestion *Suggestion) Bookmark(user *UserAccount) {
	suggestion.RemoveFromAnalytics(user)
	suggestion.Bookmarks = append(suggestion.Bookmarks, Bookmark{
		UserId:   user.Email,
		Creation: time.Now(),
	})
	suggestion.Save()
}

func (suggestion *Suggestion) RemoveFromAnalytics(user *UserAccount) {
	suggestion.AccountsClicked = exclude(suggestion.AccountsClicked, user.Email);
	suggestion.AccountsDismissed = exclude(suggestion.AccountsDismissed, user.Email)

	var bookmarks []Bookmark

	for _, b := range suggestion.Bookmarks {
		if b.UserId != user.Email {
			bookmarks = append(bookmarks, b)
		}
	}

	suggestion.Bookmarks = bookmarks
}

func (user UserAccount) GetBookmarks(count int) ([]*BookmarkPayload, error) {
	suggestionCollection := db.GetDB().C("suggestions")

	var suggestions []*Suggestion
	err := suggestionCollection.Find(bson.M{"bookmarks.user_id": user.Email}).Limit(count).All(&suggestions)

	if err != nil {
		return nil, err
	}

	var result []*BookmarkPayload

	for _, suggestion := range suggestions {
		result = append(result, suggestion.GetBookmarkPayload(user))
	}

	return result, nil
}

func (user UserAccount) GetBookmarksByTopic(topic string) ([]*BookmarkPayload, error) {
	suggestionCollection := db.GetDB().C("suggestions")

	var suggestions []*Suggestion
	err := suggestionCollection.Find(bson.M{"bookmarks.user_id": user.Email, "topic": topic}).All(&suggestions)

	if err != nil {
		return nil, err
	}

	var result []*BookmarkPayload

	for _, suggestion := range suggestions {
		result = append(result, suggestion.GetBookmarkPayload(user))
	}

	return result, nil
}

func (user *UserAccount) RemoveBookmark(id string) error {
	suggestion, err := GetSuggestion(id)

	if err != nil {
		return err
	}

	suggestion.RemoveFromAnalytics(user)
	suggestion.Save()
	return nil
}

func (user UserAccount) GetBookmarkTopics() ([]string, error) {
	suggestionCollection := db.GetDB().C("suggestions")

	var suggestions []*Suggestion
	suggestionCollection.Find(bson.M{"bookmarks.user_id": user.Email}).All(&suggestions)

	var result []string

	for _, bookmark := range suggestions {
		if !contains(result, bookmark.Topic) {
			result = append(result, bookmark.Topic)
		}
	}

	return result, nil
}

func (suggestion Suggestion) GetBookmarkPayload(user UserAccount) *BookmarkPayload {
	var bookmark Bookmark

	for _, bookmark = range suggestion.Bookmarks {
		if bookmark.UserId == user.Email {
			break
		}
	}

	return &BookmarkPayload{
		suggestion,
		bookmark,
	}
}

func contains(arr []string, s string) bool {
	for _, a := range arr {
		if a == s {
			return true
		}
	}
	return false
}