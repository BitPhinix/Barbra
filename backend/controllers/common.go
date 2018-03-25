package controllers

import (
	"github.com/gin-gonic/gin"
	"GoBackend/models"
	"net/http"
	"github.com/gin-contrib/sessions"
	"fmt"
	"github.com/gin-gonic/gin/json"
)

func BindJson(c *gin.Context, i interface{}) error {
	err := c.BindJSON(i)

	if err != nil {
		RespondError(c, http.StatusBadRequest, err.Error())
	}

	return err
}

func RespondError(c *gin.Context, code int, error string) {
	c.JSON(code, map[string]string{"error": error});
}

func SendPluginError(c *gin.Context, pluginId string, error string) {
	SendPluginJSON(c, pluginId, map[string]string{"error": error})
}

func SendPluginJSON(c *gin.Context, pluginId string, payload interface{}) {
	data, _ := json.Marshal(payload);

	SendScript(c, fmt.Sprintf("var pluginMessage='%s'; var pluginId='%s'", string(data), pluginId))
	SendScriptSrc(c, "sendPluginMessage.js")
}

func SendPluginCookie(c *gin.Context, pluginId string) {
	SendScript(c, fmt.Sprintf("var pluginId='%s'", pluginId))
	SendScriptSrc(c, "sendPluginSessionCookie.js")
}

func GetCurrentUser(c *gin.Context) *models.UserAccount {
	session := sessions.Default(c)
	user, err := models.GetAccount(fmt.Sprint(session.Get("user_id")))

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	return user
}

func CloseWindow(c *gin.Context) {
	SendScriptSrc(c, "closeWindow.js")
}

func SendScriptSrc(c *gin.Context, path string) {
	c.Writer.Write([]byte(fmt.Sprintf("<script src='/scripts/%s'></script>", path)))
}

func SendScript(c *gin.Context, script string) {
	c.Writer.Write([]byte(fmt.Sprintf("<script>%s</script>", script)))
}
