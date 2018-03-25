package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"time"
	"strconv"
	"fmt"
	"net/http"
	"../controllers"
)

func AuthenticationMiddleware(c *gin.Context) {
	session := sessions.Default(c)

	expires, err := strconv.ParseInt(fmt.Sprint(session.Get("expires")), 10, 64)

	if err != nil || expires <= time.Now().Unix() {
		controllers.RespondError(c, http.StatusUnauthorized, "Session expired!")
		c.Abort()
		return
	}

	if session.Get("user_id") == nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
}
