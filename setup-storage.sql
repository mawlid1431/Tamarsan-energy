-- ============================================
-- SAFE STORAGE SETUP
-- Run this in Supabase SQL Editor
-- It will only create what doesn't exist
-- ============================================

-- Create storage bucket for project images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if you want to recreate them (OPTIONAL)
-- Uncomment these lines if you want to start fresh:
-- DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

-- Create storage policies (only if they don't exist)
DO $$ 
BEGIN
  -- Public can view project images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can view project images'
  ) THEN
    CREATE POLICY "Public can view project images" ON storage.objects
      FOR SELECT USING (bucket_id = 'project-images');
  END IF;

  -- Authenticated users can upload project images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload project images'
  ) THEN
    CREATE POLICY "Authenticated users can upload project images" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'project-images' AND
        auth.role() = 'authenticated'
      );
  END IF;

  -- Authenticated users can update project images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update project images'
  ) THEN
    CREATE POLICY "Authenticated users can update project images" ON storage.objects
      FOR UPDATE USING (
        bucket_id = 'project-images' AND
        auth.role() = 'authenticated'
      );
  END IF;

  -- Authenticated users can delete project images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete project images'
  ) THEN
    CREATE POLICY "Authenticated users can delete project images" ON storage.objects
      FOR DELETE USING (
        bucket_id = 'project-images' AND
        auth.role() = 'authenticated'
      );
  END IF;
END $$;

-- Verify setup
SELECT 
  'Bucket exists: ' || CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'project-images') THEN 'YES ✓' ELSE 'NO ✗' END as bucket_status,
  'Policies count: ' || COUNT(*)::text as policies_count
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND policyname LIKE '%project images%';
