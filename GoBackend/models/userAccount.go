package models

import (
	"strings"
	"GoBackend/db"
	"gopkg.in/mgo.v2/bson"
	"errors"
)

type UserAccount struct {
	Email string `json:"email" bson:"_id"`
	Name string `json:"name" bson:"name"`
	Surname string `json:"surname" bson:"surname"`
}

func GetAccount(email string) (*UserAccount, error) {
	userCollection := db.GetDB().C("users")

	account := new(UserAccount)
	err := userCollection.Find(bson.M{"_id": email}).One(account)

	if err != nil {
		return nil, errors.New("Account not found!")
	}

	return account, nil
}

func RegisterAccount(email string, name string, surname string) (*UserAccount, error) {
	userCollection := db.GetDB().C("users")

	account := &UserAccount{
		Email:email,
		Name:name,
		Surname:surname,
	}

	account.Normalize()

	count, err := userCollection.Find(bson.M{"_id": account.Email}).Count()

	if err != nil || count >= 1 {
		return nil, errors.New("Email already in use!")
	}

	userCollection.Insert(account)
	return account, nil
}

func (account *UserAccount) Save() {
	userCollection := db.GetDB().C("users")
	userCollection.Update(bson.M{"_id": account.Email}, account)
}

func (account *UserAccount) Normalize() {
	account.Email = strings.ToLower(account.Email)
}
