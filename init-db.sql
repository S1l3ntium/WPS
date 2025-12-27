-- Initialize PostgreSQL database with proper settings
-- This file runs when PostgreSQL container starts

-- Create UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create inet extension for IP addresses
CREATE EXTENSION IF NOT EXISTS "inet";

-- Set default timezone
ALTER DATABASE wps SET timezone = 'UTC';

-- Optimize for this application
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = 256MB;
ALTER SYSTEM SET effective_cache_size = 1GB;
ALTER SYSTEM SET maintenance_work_mem = 64MB;
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = 16MB;
ALTER SYSTEM SET default_statistics_target = 100;

-- Log slow queries
ALTER SYSTEM SET log_min_duration_statement = 1000;  -- Log queries > 1 second
ALTER SYSTEM SET log_statement = 'all';

-- Create indices for common queries
-- These will be created by Laravel migrations, but can add manually if needed

COMMIT;
