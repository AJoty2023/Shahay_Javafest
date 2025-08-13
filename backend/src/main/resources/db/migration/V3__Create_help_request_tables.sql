-- V3__Create_help_request_tables.sql

CREATE TABLE help_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('MEDICAL', 'GROCERY', 'TRANSPORT', 'COMPANION', 'TECHNICAL', 'HOUSEHOLD', 'OTHER') NOT NULL,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_address TEXT,
    status ENUM('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'OPEN',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
    preferred_date DATE,
    preferred_time TIME,
    estimated_duration INT, -- in minutes
    compensation DECIMAL(10,2) DEFAULT 0.00,
    special_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user_requests (user_id),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_location (location_lat, location_lng),
    INDEX idx_priority (priority),
    
    CHECK (category IN ('MEDICAL', 'GROCERY', 'TRANSPORT', 'COMPANION', 'TECHNICAL', 'HOUSEHOLD', 'OTHER')),
    CHECK (status IN ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

