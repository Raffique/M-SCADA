package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func initDB() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	db.AutoMigrate(&User{}, &Device{}, &Tag{}, &Alarm{})
}

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	initDB()

	// Create Fiber app
	app := fiber.New()

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	// Setup routes
	setupRoutes(app)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(app.Listen(":" + port))
}

func setupRoutes(app *fiber.App) {
	// Auth routes
	auth := app.Group("/api/auth")
	auth.Post("/register", registerHandler)
	auth.Post("/login", loginHandler)

	// Protected routes
	api := app.Group("/api", authMiddleware)
	
	// Device routes
	devices := api.Group("/devices")
	devices.Get("/", getDevicesHandler)
	devices.Post("/", createDeviceHandler)
	devices.Get("/:id", getDeviceHandler)
	devices.Put("/:id", updateDeviceHandler)
	devices.Delete("/:id", deleteDeviceHandler)

	// Tag routes
	tags := api.Group("/tags")
	tags.Get("/", getTagsHandler)
	tags.Post("/", createTagHandler)
	tags.Get("/:id", getTagHandler)
	tags.Put("/:id", updateTagHandler)
	tags.Delete("/:id", deleteTagHandler)

	// Alarm routes
	alarms := api.Group("/alarms")
	alarms.Get("/", getAlarmsHandler)
	alarms.Post("/", createAlarmHandler)
	alarms.Get("/:id", getAlarmHandler)
	alarms.Put("/:id", updateAlarmHandler)
	alarms.Delete("/:id", deleteAlarmHandler)
}