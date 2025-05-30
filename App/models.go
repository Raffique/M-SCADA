package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Name     string `gorm:"not null"`
	Company  string `gorm:"not null"`
	Devices  []Device
}

type Device struct {
	gorm.Model
	Name        string `gorm:"not null"`
	Type        string `gorm:"not null"`
	Model       string
	IP          string
	Status      string `gorm:"not null;default:'offline'"`
	Location    string
	LastSeen    time.Time
	Description string
	UserID      uint
	Tags        []Tag
	Alarms      []Alarm
}

type Tag struct {
	gorm.Model
	Name     string  `gorm:"not null"`
	Address  string  `gorm:"not null"`
	DataType string  `gorm:"not null"`
	Value    string
	Unit     string
	Access   string `gorm:"not null;default:'Read Only'"`
	DeviceID uint
}

type Alarm struct {
	gorm.Model
	Message      string    `gorm:"not null"`
	Severity     string    `gorm:"not null"`
	Timestamp    time.Time `gorm:"not null"`
	Acknowledged bool      `gorm:"not null;default:false"`
	DeviceID     uint
}