package models

import (
	"GoBackend/db"
	"gopkg.in/mgo.v2/bson"
	"errors"
)

type OAuthAccount struct {
	Id       string `json:"account_id" bson:"account_id"`
	Provider string `json:"provider" bson:"provider"`
	UserID   string `json:"user_id" bson:"user_id"`
}

func NewOAuthAccount(provider string, id string, userId string) (*OAuthAccount, error) {
	account, err := GetOAuthAccount(provider, id)
	oAuthCollection := db.GetDB().C("OAuthAccounts")

	if err != nil {
		account = &OAuthAccount{
			Id:       id,
			Provider: provider,
			UserID:userId,
		}

		err = oAuthCollection.Insert(account)
	}

	return account, err
}

func GetOAuthAccount(provider string, id string) (*OAuthAccount, error) {
	oAuthCollection := db.GetDB().C("OAuthAccounts")
	account := new(OAuthAccount)

	err := oAuthCollection.Find(bson.M{"provider": provider, "account_id": id})

	if err != nil {
		return nil, errors.New("Unable to find account!")
	}

	return account, nil
}

func (account OAuthAccount) Delete() {
	oAuthCollection := db.GetDB().C("OAuthAccounts")
	oAuthCollection.Remove(account)
}
