-- Migration: Add verification status to users table
-- Description: Simple verification tracking - just tracks if user clicked submit

-- Add verification_status column (only 'not_submitted' or 'pending')
ALTER TABLE users
ADD COLUMN IF NOT EXISTS verification_status VARCHAR(20) DEFAULT 'not_submitted' CHECK (verification_status IN ('not_submitted', 'pending'));

-- Add verification_submitted_at timestamp
ALTER TABLE users
ADD COLUMN IF NOT EXISTS verification_submitted_at TIMESTAMP;

-- Create index on verification_status for faster queries
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON users(verification_status);

-- Update existing users to have 'not_submitted' status
UPDATE users SET verification_status = 'not_submitted' WHERE verification_status IS NULL;

COMMENT ON COLUMN users.verification_status IS 'User verification status: not_submitted or pending (forever)';
COMMENT ON COLUMN users.verification_submitted_at IS 'Timestamp when user clicked submit on verification';
