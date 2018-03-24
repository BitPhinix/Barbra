package utils

import (
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"crypto/rand"
	"encoding/hex"
	"golang.org/x/oauth2/facebook"
	"context"
	"net/http"
	"github.com/gin-gonic/gin/json"
)

var (
	Facebook = "facebook"
	Google   = "google"
)

type OAuthProvider struct {
	config          *oauth2.Config
	providerId      string
	profileQueryUrl string
}

func NewGoogleOAuthProvider(clientId string, clientSecret string) (*OAuthProvider) {
	return &OAuthProvider{
		config: &oauth2.Config{
			ClientID:     clientId,
			ClientSecret: clientSecret,
			Endpoint:     google.Endpoint,
			RedirectURL:  getAuthUrl(),
			Scopes: []string{
				"email",
				"profile",
			},
		},
		providerId:      Google,
		profileQueryUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
	}
}

func NewFacebookOAuthProvider(clientId string, clientSecret string) (*OAuthProvider) {
	return &OAuthProvider{
		config: &oauth2.Config{
			ClientID:     clientId,
			ClientSecret: clientSecret,
			Endpoint:     facebook.Endpoint,
			RedirectURL:  getAuthUrl(),
			Scopes: []string{
				"email",
				"first_name",
				"last_name",
				"id",
			},
		},
		providerId:      Facebook,
		profileQueryUrl: "https://graph.facebook.com/me?fields=id,first_name,last_name",
	}
}

func getAuthUrl() string {
	//c := config.GetConfig()
	return "http://localhost:8080/api/v1/oauth/auth";
	//return c.GetString("server.host") + c.GetString("server.port") + "/api/v1/oauth/auth"
}

func (provider OAuthProvider) GetLoginUrl(state string) string {
	return provider.config.AuthCodeURL(state)
}

func (provider OAuthProvider) ExchangeToken(code string) (*oauth2.Token, error) {
	return provider.config.Exchange(context.Background(), code)
}

func (provider OAuthProvider) GetClient(token *oauth2.Token) *http.Client {
	return provider.config.Client(context.Background(), token)
}

func (provider OAuthProvider) FetchJson(client *http.Client, url string, result interface{}) error {
	r, err := client.Get(url)

	if err != nil {
		return err
	}

	defer r.Body.Close()
	return json.NewDecoder(r.Body).Decode(result)
}

func (provider OAuthProvider) GetUserAccount(client *http.Client) (interface{}) {
	result := new(map[string]interface{})
	provider.FetchJson(client, provider.profileQueryUrl, result)
	return result
}

func RandomToken(n int) string {
	b := make([]byte, n)
	rand.Read(b)
	return hex.EncodeToString(b)
}
