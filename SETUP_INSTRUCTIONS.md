# 🎯 Complete Setup Instructions

## Step 1: Run SQL for Tables (Required)

### Copy and Run This SQL

1. **Go to Supabase Dashboard** → Your Project
2. **Click "SQL Editor"** in left sidebar
3. **Click "New query"**
4. **Copy ALL of `SIMPLE_SETUP.sql`** and paste it
5. **Click "Run"** (or Ctrl+Enter)
6. ✅ **You should see:** "Database setup complete! Tables are ready to use."

---

## Step 2: Setup Storage Bucket (For Image Uploads)

### Option A: Through Supabase UI (Easiest)

1. **Go to Supabase Dashboard** → Your Project
2. **Click "Storage"** in left sidebar
3. **Click "Create a new bucket"**
4. **Fill in:**
   - Name: `project-images`
   - Public bucket: ✅ **Check this box**
   - File size limit: 5MB
   - Allowed MIME types: Leave empty (allows all images)
5. **Click "Create bucket"**
6. ✅ **Done!** Storage is ready

### Option B: Through SQL (If UI doesn't work)

Run this in SQL Editor:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;
```

---

## Step 3: Setup Storage Policies (For Image Uploads)

### Through Supabase UI

1. **Go to Storage** → Click on `project-images` bucket
2. **Click "Policies"** tab
3. **Click "New Policy"**

#### Policy 1: Public Read (View Images)
- **Policy name:** `Public can view project images`
- **Allowed operation:** SELECT
- **Target roles:** public
- **USING expression:** `bucket_id = 'project-images'`
- Click "Review" → "Save policy"

#### Policy 2: Public Upload (Upload Images)
- **Policy name:** `Anyone can upload project images`
- **Allowed operation:** INSERT
- **Target roles:** public
- **WITH CHECK expression:** `bucket_id = 'project-images'`
- Click "Review" → "Save policy"

#### Policy 3: Public Update (Update Images)
- **Policy name:** `Anyone can update project images`
- **Allowed operation:** UPDATE
- **Target roles:** public
- **USING expression:** `bucket_id = 'project-images'`
- Click "Review" → "Save policy"

#### Policy 4: Public Delete (Delete Images)
- **Policy name:** `Anyone can delete project images`
- **Allowed operation:** DELETE
- **Target roles:** public
- **USING expression:** `bucket_id = 'project-images'`
- Click "Review" → "Save policy"

---

## Step 4: Test Everything Works

### Start Your App

```bash
npm run dev
```

### Test Admin Panel

1. **Go to:** `http://localhost:5173/admin`

2. **Test Services:**
   - Click "Services" tab
   - Click "Add Service"
   - Fill in: Title, Description, Choose Icon
   - Click "Add Service"
   - ✅ Should work!

3. **Test Projects:**
   - Click "Projects" tab
   - Click "Add Project"
   - Fill in all fields
   - Click "Choose image from device"
   - Select an image
   - Click "Add Project"
   - ✅ Should work and upload image!

4. **Test Testimonials:**
   - Click "Testimonials" tab
   - Click "Add Testimonial"
   - Fill in all fields
   - Click "Add Testimonial"
   - ✅ Should work!

### View on Website

1. **Go to:** `http://localhost:5173`
2. **Scroll through page**
3. ✅ **You should see all your content!**

---

## 🐛 Troubleshooting

### "must be owner of table objects" Error
- ✅ **Solution:** Use `SIMPLE_SETUP.sql` (no storage RLS)
- ✅ **Setup storage through UI instead** (see Step 2)

### Image Upload Doesn't Work
- ⚠️ **Check:** Storage bucket exists
- ⚠️ **Check:** Bucket is public
- ⚠️ **Check:** Storage policies are created
- ⚠️ **Check:** Browser console for errors

### Can't Add Services/Projects/Testimonials
- ⚠️ **Check:** Tables were created (run Step 1)
- ⚠️ **Check:** RLS policies exist
- ⚠️ **Check:** Browser console for errors
- ⚠️ **Check:** `.env.local` has correct Supabase credentials

### Data Doesn't Appear on Website
- ⚠️ **Check:** Data was saved in admin panel
- ⚠️ **Check:** Refresh the page
- ⚠️ **Check:** Browser console for errors
- ⚠️ **Check:** Supabase connection is working

---

## ✅ What You'll Have

After completing all steps:

### Database
- ✅ `projects` table - Store projects with images
- ✅ `services` table - Store services with icons
- ✅ `testimonials` table - Store customer testimonials
- ✅ Row Level Security enabled
- ✅ Policies allow public read/write (for now)

### Storage
- ✅ `project-images` bucket - Store uploaded images
- ✅ Public access enabled
- ✅ Policies allow upload/view/delete

### Admin Panel
- ✅ Add/Edit/Delete services
- ✅ Add/Edit/Delete projects (with image upload)
- ✅ Add/Edit/Delete testimonials
- ✅ Icon selection for services
- ✅ Image upload from device

### Frontend
- ✅ Homepage displays all content
- ✅ Services page shows all services
- ✅ Projects page shows all projects
- ✅ Testimonials page shows all testimonials
- ✅ No hardcoded data
- ✅ Real-time updates

---

## 🔒 Security Note

**Current Setup:**
- ✅ Anyone can read (good for public website)
- ⚠️ Anyone can write (temporary for testing)

**For Production:**
1. Add Supabase Authentication
2. Protect admin panel with auth
3. Change policies to require authentication for write operations
4. Update policies from `true` to `auth.role() = 'authenticated'`

---

## 📋 Quick Checklist

- [ ] Run `SIMPLE_SETUP.sql` in Supabase SQL Editor
- [ ] Create `project-images` storage bucket (public)
- [ ] Create 4 storage policies (view, upload, update, delete)
- [ ] Start dev server: `npm run dev`
- [ ] Test adding service in admin panel
- [ ] Test adding project with image in admin panel
- [ ] Test adding testimonial in admin panel
- [ ] View website and see all content
- [ ] ✅ Everything working!

---

## 🎉 You're Done!

Your database is ready! Start adding your real content:

1. ✅ Services - Your service offerings
2. ✅ Projects - Your completed projects with images
3. ✅ Testimonials - Customer feedback

**Your Tamarsan website is live and ready to manage!** 🚀
