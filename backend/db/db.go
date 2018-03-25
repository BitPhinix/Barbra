package db

import (
	config "../config"
	"gopkg.in/mgo.v2"
	"log"
)

var db *mgo.Database

func Initialize()  {
	c := config.GetConfig()

	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: []string{c.GetString("db.address")},
		Username:c.GetString("db.username"),
		Password:c.GetString("db.password"),
	})

	if err != nil {
		log.Fatal("Unable to connecto to DB:", err)
	}

	db = session.DB(c.GetString("db.name"))
}

func GetDB() *mgo.Database {
	return db
}
