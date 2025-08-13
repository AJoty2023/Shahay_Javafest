-- V9__Create_indexes.sql

-- Composite index on help_requests for location-based queries with status
CREATE INDEX idx_help_requests_location_status 
ON help_requests(location_lat, location_lng, status);

-- Composite index on volunteers table for verified volunteers
-- If you need user coordinates (latitude, longitude), they must exist in volunteers table
-- or you create a denormalized column in volunteers to store them
CREATE INDEX idx_volunteers_verified_location 
ON volunteers(verified_status, service_radius);

-- Optional: If you store last known lat/lng of volunteers in volunteers table
-- CREATE INDEX idx_volunteers_location_verified 
-- ON volunteers(verified_status, location_lat, location_lng);
