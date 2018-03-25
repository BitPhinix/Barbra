package main

import (
	"./db"
	"./config"
	"flag"
	"./server"
)

func main() {
	env := flag.String("env", "development", "-c {environment}")
	flag.Parse()

	config.Initialize(*env)
	db.Initialize()

	server.Run()
}
