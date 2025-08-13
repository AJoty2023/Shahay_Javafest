-- V4__Create_volunteer_tables.sql

CREATE TABLE volunteers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    skills JSON, -- ["Medical", "Transport", "Technical Support"]
    availability JSON, -- {"days": ["MON", "TUE"], "hours": {"start": "09:00", "end": "17:00"}}
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    verified_status BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP NULL,
    verified_by BIGINT NULL,
    background_check BOOLEAN DEFAULT FALSE,
    active_requests INT DEFAULT 0,
    completed_requests INT DEFAULT 0,
    cancelled_requests INT DEFAULT 0,
    max_concurrent_requests INT DEFAULT 3,
    service_radius INT DEFAULT 10, -- in kilometers
    bio TEXT,
    languages JSON, -- ["English", "Bengali", "Hindi"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_verified (verified_status),
    INDEX idx_rating (rating)
    -- JSON indexes are not supported directly; you can create generated columns if needed
    -- INDEX idx_availability ((CAST(availability AS CHAR(255)))),
    -- INDEX idx_skills ((CAST(skills AS CHAR(255))))
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


