package models

import (
	"../db"
	"gopkg.in/mgo.v2/bson"
	"log"
)

type Suggestion struct {
	Id                string     `json:"id "bson:"_id"`
	ArticleUrl        string     `json:"article_url" bson:"article_url"`
	Content           string     `json:"content" bson:"content"`
	Title             string     `json:"title" bson:"title"`
	Topic             string     `json:"topic" bson:"topic"`
	AccountsClicked   []string   `json:"-" bson:"accounts_clicked"`
	AccountsDismissed []string   `json:"-" bson:"accounts_dismissed"`
	Bookmarks         []Bookmark `json:"-" bson:"bookmarks"`
}

func GetSuggestion(id string) (*Suggestion, error) {
	suggestionCollection := db.GetDB().C("suggestions")

	log.Println(id)

	suggestion := new(Suggestion)
	err := suggestionCollection.Find(bson.M{"_id": id}).One(suggestion)

	if err != nil {
		return nil, err
	}

	return suggestion, nil
}

func (suggestion *Suggestion) SetId() {
	suggestionCollection := db.GetDB().C("suggestions")

	dbentry := new(Suggestion)
	err := suggestionCollection.Find(bson.M{"article_url": suggestion.ArticleUrl, "content": suggestion.Content, "title": suggestion.Title}).One(dbentry)

	if err != nil {
		suggestion.Save()
		return
	}

	suggestion.Id = dbentry.Id
}

func (suggestion *Suggestion) UserClicked(user *UserAccount) {
	suggestion.RemoveFromAnalytics(user)
	suggestion.AccountsClicked = append(suggestion.AccountsClicked, user.Email)
	suggestion.Save()
}

func (suggestion *Suggestion) UserDismissed(user *UserAccount) {
	suggestion.RemoveFromAnalytics(user)
	suggestion.AccountsDismissed = append(suggestion.AccountsDismissed, user.Email)
	suggestion.Save()
}

func (suggestion *Suggestion) Save() {
	suggestionCollection := db.GetDB().C("suggestions")
	err := suggestionCollection.Update(bson.M{"_id": suggestion.Id}, suggestion)

	if err != nil {
		suggestion.Id = "suggestion_" + bson.NewObjectId().Hex()
		suggestionCollection.Insert(suggestion)
	}
}

func exclude(arr []string, e string) []string {
	var result []string

	for _, s := range arr {
		if s != e {
			result = append(result, s)
		}
	}

	return result
}
