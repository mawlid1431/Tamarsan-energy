-- ============================================
-- FRESH SETUP - Complete Database Schema
-- Run this in Supabase SQL Editor
-- This will create everything from scratch
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING TABLES (if you want fresh start)
-- ============================================
-- Uncomment these lines if you want to delete everything and start fresh:
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS testimonials CASCADE;

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

-- Projects policies
DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Services policies
DROP POLICY IF EXISTS "Public can view services" ON services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON services;

-- Testimonials policies
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Projects policies (public read, authenticated write)
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Services policies (public read, authenticated write)
CREATE POLICY "Public can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials policies (public read, authenticated write)
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE SETUP
-- ============================================

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Public can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update project images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete project images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

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

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;

-- Create triggers to auto-update updated_at
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

-- Check tables
SELECT 
  'Tables created: ' || COUNT(*)::text as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'services', 'testimonials');

-- Check storage bucket
SELECT 
  'Storage bucket: ' || CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'project-images') THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

-- Check policies count
SELECT 
  'RLS Policies: ' || COUNT(*)::text as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'services', 'testimonials');

-- Check storage policies count
SELECT 
  'Storage Policies: ' || COUNT(*)::text as status
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND policyname LIKE '%project images%';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ Setup complete! Your database is ready to use.' as message;
