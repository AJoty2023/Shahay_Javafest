-- V7__Create_abuse_reports_table.sql

CREATE TABLE abuse_reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reporter_id BIGINT NULL, -- NULL for anonymous reports
    incident_type ENUM(
        'DOMESTIC_VIOLENCE', 
        'SEXUAL_HARASSMENT', 
        'CHILD_ABUSE', 
        'ELDER_ABUSE', 
        'HUMAN_TRAFFICKING', 
        'WORKPLACE_HARASSMENT', 
        'OTHER'
    ) NOT NULL,
    description TEXT NOT NULL,
    incident_date DATE,
    incident_location TEXT,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    anonymous BOOLEAN DEFAULT FALSE,
    victim_details JSON,        -- Anonymous victim info if provided
    perpetrator_details JSON,   -- Anonymous perpetrator info if provided
    evidence_files JSON,        -- Array of file paths
    status ENUM('SUBMITTED', 'UNDER_REVIEW', 'INVESTIGATING', 'RESOLVED', 'CLOSED') DEFAULT 'SUBMITTED',
    assigned_to BIGINT NULL,    -- Admin or case worker
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    follow_up_required BOOLEAN DEFAULT TRUE,
    police_reported BOOLEAN DEFAULT FALSE,
    police_case_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_type (incident_type),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned (assigned_to)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
  
