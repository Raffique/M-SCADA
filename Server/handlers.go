package main

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// Auth handlers
func registerHandler(c *fiber.Ctx) error {
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}
	user.Password = string(hashedPassword)

	// Create user
	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.Status(201).JSON(fiber.Map{
		"id":      user.ID,
		"email":   user.Email,
		"name":    user.Name,
		"company": user.Company,
	})
}

func loginHandler(c *fiber.Ctx) error {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	var user User
	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":      user.ID,
		"email":   user.Email,
		"name":    user.Name,
		"company": user.Company,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
	}

	return c.JSON(fiber.Map{
		"token": tokenString,
		"user": fiber.Map{
			"id":      user.ID,
			"email":   user.Email,
			"name":    user.Name,
			"company": user.Company,
		},
	})
}

// Device handlers
func getDevicesHandler(c *fiber.Ctx) error {
	var devices []Device
	if err := db.Find(&devices).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch devices"})
	}
	return c.JSON(devices)
}

func createDeviceHandler(c *fiber.Ctx) error {
	var device Device
	if err := c.BodyParser(&device); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Create(&device).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create device"})
	}

	return c.Status(201).JSON(device)
}

func getDeviceHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var device Device
	if err := db.Preload("Tags").Preload("Alarms").First(&device, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Device not found"})
	}
	return c.JSON(device)
}

func updateDeviceHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var device Device
	if err := db.First(&device, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Device not found"})
	}

	if err := c.BodyParser(&device); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Save(&device).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update device"})
	}

	return c.JSON(device)
}

func deleteDeviceHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := db.Delete(&Device{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete device"})
	}
	return c.SendStatus(204)
}

// Tag handlers
func getTagsHandler(c *fiber.Ctx) error {
	var tags []Tag
	if err := db.Find(&tags).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch tags"})
	}
	return c.JSON(tags)
}

func createTagHandler(c *fiber.Ctx) error {
	var tag Tag
	if err := c.BodyParser(&tag); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Create(&tag).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create tag"})
	}

	return c.Status(201).JSON(tag)
}

func getTagHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var tag Tag
	if err := db.First(&tag, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Tag not found"})
	}
	return c.JSON(tag)
}

func updateTagHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var tag Tag
	if err := db.First(&tag, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Tag not found"})
	}

	if err := c.BodyParser(&tag); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Save(&tag).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update tag"})
	}

	return c.JSON(tag)
}

func deleteTagHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := db.Delete(&Tag{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete tag"})
	}
	return c.SendStatus(204)
}

// Alarm handlers
func getAlarmsHandler(c *fiber.Ctx) error {
	var alarms []Alarm
	if err := db.Find(&alarms).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch alarms"})
	}
	return c.JSON(alarms)
}

func createAlarmHandler(c *fiber.Ctx) error {
	var alarm Alarm
	if err := c.BodyParser(&alarm); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Create(&alarm).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create alarm"})
	}

	return c.Status(201).JSON(alarm)
}

func getAlarmHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var alarm Alarm
	if err := db.First(&alarm, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Alarm not found"})
	}
	return c.JSON(alarm)
}

func updateAlarmHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	var alarm Alarm
	if err := db.First(&alarm, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Alarm not found"})
	}

	if err := c.BodyParser(&alarm); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := db.Save(&alarm).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update alarm"})
	}

	return c.JSON(alarm)
}

func deleteAlarmHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := db.Delete(&Alarm{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete alarm"})
	}
	return c.SendStatus(204)
}