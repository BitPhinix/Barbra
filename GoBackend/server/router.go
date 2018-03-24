package server

import (
	"github.com/gin-gonic/gin"
	"GoBackend/middlewares"
	"GoBackend/config"
	"github.com/gin-contrib/sessions"
	"net/http"
	"GoBackend/controllers"
)

func newRouter() *gin.Engine {
	c := config.GetConfig()

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	store := sessions.NewCookieStore([]byte(c.GetString("server.cookie_secret")))
	router.Use(sessions.Sessions("session", store))

	oauthController := controllers.NewOAuth()

	//Public routes
	public := router.Group("/api/v1/")
	public.Handle(http.MethodGet, "oauth/login", oauthController.Login)
	public.Handle(http.MethodGet, "oauth/auth", oauthController.Auth)

	//Private routes
	private := router.Group("/api/v1")
	private.Use(middlewares.AuthenticationMiddleware)

	return router
}
