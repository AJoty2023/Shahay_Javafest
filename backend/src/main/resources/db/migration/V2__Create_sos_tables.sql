-- V2__Create_sos_tables.sql

CREATE TABLE sos_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_address TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ACTIVE', 'RESPONDED', 'RESOLVED', 'FALSE_ALARM') DEFAULT 'ACTIVE',
    audio_file VARCHAR(255),
    emergency_message TEXT,
    severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'HIGH',
    response_time TIMESTAMP NULL,
    responder_id BIGINT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (responder_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_alerts (user_id),
    INDEX idx_status (status),
    INDEX idx_timestamp (timestamp),
    INDEX idx_location (location_lat, location_lng),
    CHECK (status IN ('ACTIVE','RESPONDED','RESOLVED','FALSE_ALARM')),
    CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL'))
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;





