-- NTHE Customer Database Schema
-- MySQL Database Setup Script

-- Create database
CREATE DATABASE IF NOT EXISTS nthe_customer_db;

USE nthe_customer_db;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_last_name (last_name)
);

-- Sample data (optional)
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code, country) VALUES
('John', 'Doe', 'john.doe@example.com', '555-0101', '123 Main St', 'Springfield', 'IL', '62701', 'USA'),
('Jane', 'Smith', 'jane.smith@example.com', '555-0102', '456 Oak Ave', 'Portland', 'OR', '97201', 'USA'),
('Bob', 'Johnson', 'bob.johnson@example.com', '555-0103', '789 Pine Rd', 'Austin', 'TX', '78701', 'USA');
