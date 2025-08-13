-- =============================================
-- SUPPORTING TABLES (Improved Version)
-- =============================================

-- Volunteer Assignments
CREATE TABLE volunteer_assignments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    volunteer_id BIGINT NOT NULL,
    help_request_id BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    status ENUM('ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'ASSIGNED',
    cancellation_reason TEXT,

    CONSTRAINT fk_volunteer FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE,
    CONSTRAINT fk_help_request FOREIGN KEY (help_request_id) REFERENCES help_requests(id) ON DELETE CASCADE,
    INDEX idx_volunteer (volunteer_id),
    INDEX idx_request (help_request_id),
    INDEX idx_status (status)
);

-- Reviews and Ratings
CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reviewer_id BIGINT NOT NULL,
    reviewee_id BIGINT NOT NULL,
    help_request_id BIGINT NULL,
    assignment_id BIGINT NULL,
    rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reviewer FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviewee FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_help_request FOREIGN KEY (help_request_id) REFERENCES help_requests(id) ON DELETE SET NULL,
    CONSTRAINT fk_assignment FOREIGN KEY (assignment_id) REFERENCES volunteer_assignments(id) ON DELETE SET NULL,
    INDEX idx_reviewee (reviewee_id),
    INDEX idx_rating (rating)
);

-- Blood Requests
CREATE TABLE blood_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    requester_id BIGINT NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    units_needed TINYINT UNSIGNED DEFAULT 1,
    hospital_name VARCHAR(200) NOT NULL,
    hospital_address TEXT,
    hospital_lat DECIMAL(10,8),
    hospital_lng DECIMAL(11,8),
    contact_person VARCHAR(100),
    contact_phone VARCHAR(20) NOT NULL,
    needed_by TIMESTAMP NOT NULL,
    urgency ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    status ENUM('OPEN', 'PARTIAL', 'FULFILLED', 'EXPIRED') NOT NULL DEFAULT 'OPEN',
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_requester FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_blood_type (blood_type),
    INDEX idx_status (status),
    INDEX idx_urgency (urgency),
    INDEX idx_needed_by (needed_by)
);

-- Blood Donations
CREATE TABLE blood_donations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    donor_id BIGINT NOT NULL,
    blood_request_id BIGINT NULL,
    units_donated TINYINT UNSIGNED DEFAULT 1,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hospital_name VARCHAR(200),
    verified BOOLEAN DEFAULT FALSE,
    verification_document VARCHAR(255),

    CONSTRAINT fk_donor FOREIGN KEY (donor_id) REFERENCES blood_donors(id) ON DELETE CASCADE,
    CONSTRAINT fk_blood_request FOREIGN KEY (blood_request_id) REFERENCES blood_requests(id) ON DELETE SET NULL,
    INDEX idx_donor (donor_id),
    INDEX idx_date (donation_date)
);

-- Emergency Contacts Directory
CREATE TABLE emergency_contacts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category ENUM('POLICE','MEDICAL','FIRE','WOMEN_HELPLINE','CHILD_HELPLINE','MENTAL_HEALTH','LEGAL_AID','OTHER') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    secondary_phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    available_24x7 BOOLEAN DEFAULT TRUE,
    languages JSON,
    services_offered TEXT,
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_category (category),
    INDEX idx_city (city),
    INDEX idx_active (is_active)
);

-- Well-being Check-ins
CREATE TABLE wellbeing_checkins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    check_date DATE NOT NULL,
    status ENUM('PENDING','RESPONDED','MISSED','EMERGENCY_TRIGGERED') NOT NULL DEFAULT 'PENDING',
    response_time TIMESTAMP NULL,
    mood_rating TINYINT UNSIGNED CHECK (mood_rating BETWEEN 1 AND 5),
    notes TEXT,
    emergency_contacts_notified BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_checkin_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_date (user_id, check_date),
    INDEX idx_status (status)
);

-- Missing Person Sightings
CREATE TABLE missing_person_sightings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    missing_person_id BIGINT NOT NULL,
    reporter_id BIGINT NULL,
    sighting_location_lat DECIMAL(10,8),
    sighting_location_lng DECIMAL(11,8),
    sighting_address TEXT,
    sighting_date TIMESTAMP NOT NULL,
    description TEXT,
    photo VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_missing_person FOREIGN KEY (missing_person_id) REFERENCES missing_persons(id) ON DELETE CASCADE,
    CONSTRAINT fk_sighting_reporter FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_missing_person (missing_person_id),
    INDEX idx_date (sighting_date)
);

-- Notifications
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type ENUM('SOS_ALERT','HELP_REQUEST','ASSIGNMENT','BLOOD_REQUEST','MISSING_PERSON','ABUSE_REPORT','SYSTEM') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSON,
    read_status BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,

    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_unread (user_id, read_status),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
);

-- AI Analysis Logs
CREATE TABLE ai_analysis_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    entity_type ENUM('SOS_ALERT','HELP_REQUEST','ABUSE_REPORT','USER_MESSAGE') NOT NULL,
    entity_id BIGINT NOT NULL,
    analysis_type ENUM('SENTIMENT','INTENT','RISK_ASSESSMENT','VOLUNTEER_MATCHING') NOT NULL,
    input_data TEXT,
    output_data JSON,
    confidence_score DECIMAL(5,4) CHECK (confidence_score BETWEEN 0 AND 1),
    model_version VARCHAR(50),
    processing_time INT UNSIGNED, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_type (analysis_type),
    INDEX idx_created (created_at)
);
