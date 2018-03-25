package server

import (
	"GoBackend/config"
)

func Run() {
	c := config.GetConfig()
	router := newRouter()
	router.Run(c.GetString("server.port"))
}
