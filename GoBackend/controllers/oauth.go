package controllers

import (
	"github.com/gin-gonic/gin"
	"GoBackend/utils"
	"GoBackend/config"
	"net/http"
	"github.com/gin-contrib/sessions"
	"fmt"
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
		respondError(c, http.StatusBadRequest, "Invalid oauth provider!")
		return
	}

	state := utils.RandomToken(64)

	session := sessions.Default(c)
	session.Set("state", state)
	session.Set("provider", providerId)
	session.Save()

	c.JSON(http.StatusOK, map[string]string{"url": provider.GetLoginUrl(state)})
}

func (oAuth *OAuth) Auth(c *gin.Context) {
	session := sessions.Default(c)

	if session.Get("state") != c.Query("state") || session.Get("state") == nil {
		respondError(c, http.StatusUnauthorized, "Invalid session state!")
		return
	}

	provider := oAuth.GetProvider(fmt.Sprint(session.Get("provider")))

	if provider == nil {
		respondError(c, http.StatusBadRequest, "Invalid oauth provider!")
		return
	}

	token, err := provider.ExchangeToken(fmt.Sprint(c.Query("code")))

	if err != nil {
		respondError(c, http.StatusUnauthorized, "Unable to exchange token!")
		return
	}

	client := provider.GetClient(token)
	c.JSON(http.StatusOK, provider.GetUserAccount(client))
}

//window.parent.postMessage(obj);
func (oAuth *OAuth) GetProvider(id string) (*utils.OAuthProvider) {
	if id == utils.Google {
		return oAuth.googleProvider
	}

	if id == utils.Facebook {
		return oAuth.facebookProvider
	}

	return nil
}
