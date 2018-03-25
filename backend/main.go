package main

import (
	"GoBackend/db"
	"GoBackend/config"
	"flag"
	"GoBackend/server"
)

func main() {
	env := flag.String("env", "development", "-c {environment}")
	flag.Parse()

	config.Initialize(*env)
	db.Initialize()

	server.Run()
}
