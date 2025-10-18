-- ============================================
-- COMPLETE ONE-TIME SETUP
-- Run this ONCE in Supabase SQL Editor
-- Sets up ALL tables and storage with policies
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
-- DROP OLD POLICIES (Clean Slate)
-- ============================================

-- Projects
DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Anyone can insert projects" ON projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON projects;

-- Services
DROP POLICY IF EXISTS "Public can view services" ON services;
DROP POLICY IF EXISTS "Anyone can insert services" ON services;
DROP POLICY IF EXISTS "Anyone can update services" ON services;
DROP POLICY IF EXISTS "Anyone can delete services" ON services;

-- Testimonials
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can delete testimonials" ON testimonials;

-- ============================================
-- CREATE TABLE POLICIES (Public Access)
-- ============================================

-- Projects policies
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert projects" ON projects
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update projects" ON projects
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete projects" ON projects
  FOR DELETE TO public USING (true);

-- Services policies
CREATE POLICY "Public can view services" ON services
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert services" ON services
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update services" ON services
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete services" ON services
  FOR DELETE TO public USING (true);

-- Testimonials policies
CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update testimonials" ON testimonials
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete testimonials" ON testimonials
  FOR DELETE TO public USING (true);

-- ============================================
-- STORAGE SETUP
-- ============================================

-- Create storage bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop old storage policies
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Create storage policies (Public Access)
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload images" ON storage.objects
  FOR INSERT TO public
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update images" ON storage.objects
  FOR UPDATE TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete images" ON storage.objects
  FOR DELETE TO public
  USING (bucket_id = 'project-images');

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);
CREATE INDEX IF NOT EXISTS idx_testimonials_rate ON testimonials(rate DESC);

-- ============================================
-- CREATE FUNCTIONS
-- ============================================

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

-- Check tables
SELECT 
  '✅ Tables: ' || COUNT(*)::text || ' created' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'services', 'testimonials');

-- Check table policies
SELECT 
  '✅ Table Policies: ' || COUNT(*)::text || ' created' as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'services', 'testimonials');

-- Check storage bucket
SELECT 
  '✅ Storage Bucket: ' || 
  CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'project-images' AND public = true) 
    THEN 'Created (Public)' 
    ELSE 'Missing' 
  END as status;

-- Check storage policies
SELECT 
  '✅ Storage Policies: ' || COUNT(*)::text || ' created' as status
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND policyname LIKE '%images%';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '
🎉 SETUP COMPLETE! 🎉

✅ All tables created
✅ All policies created (public access)
✅ Storage bucket created (public)
✅ Storage policies created (public access)
✅ Image uploads will work now!

⚠️  SECURITY NOTE:
Currently set to PUBLIC ACCESS for testing.
For production, add authentication and restrict policies.

🚀 Ready to use! Go to your admin panel and start adding content!
' as message;
