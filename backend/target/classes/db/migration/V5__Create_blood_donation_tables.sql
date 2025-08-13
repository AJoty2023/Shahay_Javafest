-- V5__Create_blood_donors_table.sql

CREATE TABLE blood_donors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    last_donation DATE,
    availability BOOLEAN DEFAULT TRUE,
    weight DECIMAL(5,2), -- in kg
    medical_conditions TEXT,
    emergency_contact VARCHAR(20),
    preferred_hospitals JSON, -- Hospital IDs or names
    donation_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_blood_type (blood_type),
    INDEX idx_availability (availability),
    INDEX idx_last_donation (last_donation),
    UNIQUE KEY unique_user_donor (user_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

