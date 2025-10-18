-- ============================================
-- SIMPLE SETUP - Database Schema (No Storage RLS)
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CREATE TABLES
-- ============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  rate DECIMAL(3,2) CHECK (rate >= 0 AND rate <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Sun',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rate DECIMAL(3,2) CHECK (rate >= 0 AND rate <= 5),
  description TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (for fresh start)
-- ============================================

DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

DROP POLICY IF EXISTS "Public can view services" ON services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON services;

DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Projects policies (public read, anyone can write for now)
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert projects" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update projects" ON projects
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete projects" ON projects
  FOR DELETE USING (true);

-- Services policies (public read, anyone can write for now)
CREATE POLICY "Public can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert services" ON services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update services" ON services
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete services" ON services
  FOR DELETE USING (true);

-- Testimonials policies (public read, anyone can write for now)
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update testimonials" ON testimonials
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete testimonials" ON testimonials
  FOR DELETE USING (true);

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);
CREATE INDEX IF NOT EXISTS idx_testimonials_rate ON testimonials(rate DESC);

-- ============================================
-- CREATE FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREATE TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  'Tables created: ' || COUNT(*)::text as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'services', 'testimonials');

SELECT 
  'RLS Policies: ' || COUNT(*)::text as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'services', 'testimonials');

SELECT '✅ Database setup complete! Tables are ready to use.' as message;
