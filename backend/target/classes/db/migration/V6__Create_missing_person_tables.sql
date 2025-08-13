-- V6__Create_missing_persons_table.sql

CREATE TABLE missing_persons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reporter_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    description TEXT NOT NULL,
    photo VARCHAR(255),
    height VARCHAR(20),
    weight VARCHAR(20),
    clothing_description TEXT,
    distinguishing_marks TEXT,
    last_seen_location_lat DECIMAL(10, 8),
    last_seen_location_lng DECIMAL(11, 8),
    last_seen_address TEXT,
    last_seen_date TIMESTAMP NOT NULL,
    contact_info VARCHAR(100),
    police_case_number VARCHAR(50),
    status ENUM('MISSING', 'FOUND', 'CLOSED') DEFAULT 'MISSING',
    found_date TIMESTAMP NULL,
    found_location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_status (status),
    INDEX idx_last_seen (last_seen_date),
    INDEX idx_location (last_seen_location_lat, last_seen_location_lng)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

  
