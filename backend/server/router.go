package server

import (
	"github.com/gin-gonic/gin"
	"../middlewares"
	"../config"
	"github.com/gin-contrib/sessions"
	"net/http"
	"../controllers"
	"github.com/gin-contrib/static"
)

func newRouter() *gin.Engine {
	c := config.GetConfig()

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	store := sessions.NewCookieStore([]byte(c.GetString("server.cookie_secret")))
	router.Use(sessions.Sessions("session", store))

	//Static paths
	router.Use(static.Serve("/", static.LocalFile("public", false)))

	oauthController := controllers.NewOAuth()
	profileController := new(controllers.Profile)
	bookmarkController := controllers.Bookmark{}
	suggestionController := controllers.Suggestion{}

	//---------------------- Public routes ----------------------
	public := router.Group("/api/v1/")

	//OAuth
	public.Handle(http.MethodGet, "oauth/login", oauthController.Login)
	public.Handle(http.MethodGet, "oauth/auth", oauthController.Auth)

	//---------------------- Private routes ----------------------
	private := router.Group("/api/v1")
	private.Use(middlewares.AuthenticationMiddleware)

	private.Handle(http.MethodGet, "user", profileController.GetAccount)

	private.Handle(http.MethodGet, "bookmarks", bookmarkController.GetBookmarks)
	private.Handle(http.MethodGet, "bookmarks/topics", bookmarkController.GetTopics)
	private.Handle(http.MethodPost, "bookmarks", bookmarkController.AddBookmark)
	private.Handle(http.MethodDelete, "bookmarks", bookmarkController.DeleteBookmark)

	private.Handle(http.MethodGet, "suggestion", suggestionController.GetSuggestions)

	return router
}
