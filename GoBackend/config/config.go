package config

import (
	"github.com/spf13/viper"
	"log"
)

var config *viper.Viper

func Initialize(name string) {
	config = viper.New()

	config.SetConfigName("development")
	config.SetConfigType("yaml")
	config.AddConfigPath("config/")

	err := config.ReadInConfig()

	if err != nil {
		log.Fatal("Unable to load config: ", err)
	}
}

func GetConfig() *viper.Viper {
	return config
}
