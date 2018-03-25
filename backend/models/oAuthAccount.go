package models

import (
	"../db"
	"gopkg.in/mgo.v2/bson"
	"errors"
)

type OAuthAccount struct {
	Id        string `json:"-" bson:"_id"`
	AccountId string `json:"account_id" bson:"account_id"`
	Provider  string `json:"provider" bson:"provider"`
	UserID    string `json:"user_id" bson:"user_id"`
}

func RegisterOAuthAccount(provider string, id string, userId string) (*OAuthAccount, error) {
	account, err := GetOAuthAccount(provider, id)
	oAuthCollection := db.GetDB().C("oauth_accounts")

	if err != nil {
		account = &OAuthAccount{
			Id:"oauth_account_" + bson.NewObjectId().Hex(),
			AccountId: id,
			Provider:  provider,
			UserID:    userId,
		}

		err = oAuthCollection.Insert(account)
	}

	return account, err
}

func GetOAuthAccount(provider string, id string) (*OAuthAccount, error) {
	oAuthCollection := db.GetDB().C("oauth_accounts")
	account := new(OAuthAccount)

	err := oAuthCollection.Find(bson.M{"provider": provider, "account_id": id}).One(account)

	if err != nil {
		return nil, errors.New("Unable to find account!")
	}

	return account, nil
}

func (account OAuthAccount) Save() {
	oAuthCollection := db.GetDB().C("oauth_accounts")
	err := oAuthCollection.Update(bson.M{"_id": account.Id}, account)

	if err != nil {
		oAuthCollection.Insert(account)
	}
}

func (account OAuthAccount) Delete() {
	oAuthCollection := db.GetDB().C("oauth_accounts")
	oAuthCollection.Remove(account)
}
