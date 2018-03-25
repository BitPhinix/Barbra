package controllers

import (
	"github.com/gin-gonic/gin"
	"../utils"
	"../config"
	"net/http"
	"github.com/gin-contrib/sessions"
	"fmt"
	"time"
)

type OAuth struct {
	googleProvider   *utils.OAuthProvider
	facebookProvider *utils.OAuthProvider
}

func NewOAuth() *OAuth {
	c := config.GetConfig()

	return &OAuth{
		facebookProvider: utils.NewFacebookOAuthProvider(c.GetString("oauth.facebook.client_id"), c.GetString("oauth.facebook.client_secret")),
		googleProvider:   utils.NewGoogleOAuthProvider(c.GetString("oauth.google.client_id"), c.GetString("oauth.google.client_secret")),
	}
}

func (oAuth *OAuth) Login(c *gin.Context) {
	providerId := c.Query("provider")
	provider := oAuth.GetProvider(providerId)

	if provider == nil {
		RespondError(c, http.StatusBadRequest, "Invalid oauth provider!")
		return
	}

	extensionId := fmt.Sprint(c.Query("ext_id"))

	if len(extensionId) != 32 {
		RespondError(c, http.StatusBadRequest, "Invalid ext_id!")
		return
	}

	state := utils.RandomToken(64)

	session := sessions.Default(c)
	session.Set("state", state)
	session.Set("provider", providerId)
	session.Set("expires", time.Now().Unix()+30*24*60*60*1000)
	session.Set("ext_id", extensionId)
	session.Save()

	c.JSON(http.StatusOK, map[string]string{"url": provider.GetLoginUrl(state)})
}

func (oAuth *OAuth) Auth(c *gin.Context) {
	session := sessions.Default(c)
	extensionId := fmt.Sprint(session.Get("ext_id"))

	if session.Get("state") != c.Query("state") || session.Get("state") == nil {
		SendPluginError(c, extensionId, "Invalid session (-state)!")
		CloseWindow(c)
		return
	}

	provider := oAuth.GetProvider(fmt.Sprint(session.Get("provider")))

	if provider == nil {
		SendPluginError(c, extensionId, "Invalid oauth provider!")
		CloseWindow(c)
		return
	}

	token, err := provider.ExchangeToken(fmt.Sprint(c.Query("code")))

	if err != nil {
		SendPluginError(c, extensionId, err.Error())
		CloseWindow(c)
		return
	}

	client := provider.GetClient(token)
	user, err := provider.GetUserAccount(client)

	if err != nil {
		SendPluginError(c, extensionId, err.Error())
		CloseWindow(c)
		return
	}

	session.Set("user_id", user.Email)
	session.Save()

	SendPluginCookie(c, extensionId)
	CloseWindow(c)
}

func (oAuth *OAuth) GetProvider(id string) (*utils.OAuthProvider) {
	if id == utils.Google {
		return oAuth.googleProvider
	}

	if id == utils.Facebook {
		return oAuth.facebookProvider
	}

	return nil
}
