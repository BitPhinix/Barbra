package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"time"
	"strconv"
	"fmt"
	"net/http"
	"errors"
)

func AuthenticationMiddleware(c *gin.Context) {
	session := sessions.Default(c)

	expires, err := strconv.ParseInt(fmt.Sprint(session.Get("expires")), 10, 64)

	if err != nil || expires >= time.Now().Unix() {
		c.AbortWithError(http.StatusUnauthorized, errors.New("Session expired!"))
		return
	}

	if session.Get("user_id") == nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
}
