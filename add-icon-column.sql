-- Add icon column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'Sun';

-- Update existing services to have a default icon
UPDATE services SET icon = 'Sun' WHERE icon IS NULL;
