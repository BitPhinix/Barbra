package controllers

import "github.com/gin-gonic/gin"

func respondError(c *gin.Context, code int, error string)  {
	c.JSON(code, map[string]string{"error": error});
}
