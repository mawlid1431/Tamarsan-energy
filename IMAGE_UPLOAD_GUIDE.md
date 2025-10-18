# 📸 Image Upload Feature Added!

## ✅ What's New

You can now **upload images directly from your device** when adding or editing projects! No need to use external image URLs anymore.

---

## 🎯 Features

### ✅ Upload from Device
- Click "Choose image from device"
- Select image from your computer/phone
- Image uploads automatically to Supabase Storage
- Preview image before saving

### ✅ Or Use URL
- Still works! Paste any image URL
- Useful for images already hosted online

### ✅ Image Preview
- See image before saving
- Remove and choose different image
- Works for both uploaded and URL images

### ✅ Validation
- Max size: 5MB
- Supported formats: JPG, PNG, GIF, WebP
- Automatic error messages

---

## 🚀 How to Use

### Step 1: Fix the Storage Bucket Error

The error you saw is because the storage bucket already exists. Run this SQL in Supabase:

```sql
-- This is already fixed in your schema file
-- Just re-run the schema or run this:
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;
```

Or simply **ignore the error** - the bucket already exists and works fine!

### Step 2: Add Project with Image Upload

1. **Go to admin panel**: `http://localhost:5173/admin`
2. **Click "Projects" tab**
3. **Click "Add Project"**
4. **Fill in the form**:
   - Name: "Hargeisa Solar Farm"
   - Date: "2024-01-15"
   - Location: "Hargeisa, Somaliland"
   - Description: "500kW solar installation..."
   - **Image**: Click "Choose image from device"
   - Select an image from your computer
   - See preview of the image
   - Rate: "4.5"
5. **Click "Add Project"**
6. **Image uploads automatically** and project is saved!
7. ✨ **Project appears with your uploaded image!**

### Step 3: View on Website

1. Go to: `http://localhost:5173`
2. Scroll to projects section
3. **See your project with the uploaded image!**

---

## 📸 Upload Options

### Option 1: Upload from Device (NEW!)

```
┌─────────────────────────────────────┐
│ Project Image                       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  📁 Choose image from device    │ │ ← Click here
│ └─────────────────────────────────┘ │
│                                     │
│ Or paste image URL:                 │
│ [                                 ] │
│                                     │
│ Max size: 5MB. Supported: JPG, PNG  │
└─────────────────────────────────────┘
```

### Option 2: Use URL (Still Works!)

```
┌─────────────────────────────────────┐
│ Project Image                       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  📁 Choose image from device    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Or paste image URL:                 │
│ [https://example.com/image.jpg  ] │ ← Paste URL here
│                                     │
│ Max size: 5MB. Supported: JPG, PNG  │
└─────────────────────────────────────┘
```

### With Preview

```
┌─────────────────────────────────────┐
│ Project Image                       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │     [Image Preview]         [X] │ │ ← Remove button
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  📁 solar-panel.jpg             │ │ ← File name
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 🎨 How It Works

### Upload Process

```
1. You select image from device
   ↓
2. Image preview appears
   ↓
3. You click "Add Project"
   ↓
4. Image uploads to Supabase Storage
   ↓
5. Upload completes (shows "Uploading...")
   ↓
6. Public URL is saved to database
   ↓
7. Project appears on website with image!
```

### Storage Location

- **Bucket**: `project-images`
- **Access**: Public (anyone can view)
- **URL Format**: `https://[your-project].supabase.co/storage/v1/object/public/project-images/[filename]`

---

## 📋 Example Usage

### Example 1: Upload Solar Panel Image

```
1. Click "Add Project"
2. Fill in:
   - Name: "Berbera Hospital Solar System"
   - Date: "2023-12-01"
   - Location: "Berbera, Somaliland"
   - Description: "200kW solar system..."
3. Click "Choose image from device"
4. Select: solar-panels-hospital.jpg
5. See preview of the image
6. Rate: 5
7. Click "Add Project"
8. Wait for "Uploading..." to finish
9. ✨ Project saved with uploaded image!
```

### Example 2: Use URL Instead

```
1. Click "Add Project"
2. Fill in project details
3. Paste URL in "Or paste image URL" field:
   https://images.unsplash.com/photo-1509391366360-2e959784a276
4. See preview of the image
5. Click "Add Project"
6. ✨ Project saved with URL image!
```

### Example 3: Change Image

```
1. Click pencil icon on existing project
2. See current image preview
3. Click [X] to remove current image
4. Click "Choose image from device"
5. Select new image
6. Click "Update Project"
7. ✨ Image updated!
```

---

## 🔧 Technical Details

### Image Validation

- **Max Size**: 5MB (5,242,880 bytes)
- **Formats**: JPG, JPEG, PNG, GIF, WebP
- **Validation**: Automatic before upload
- **Error Messages**: Clear feedback if validation fails

### File Naming

- **Format**: `[random]-[timestamp].[extension]`
- **Example**: `abc123-1234567890.jpg`
- **Purpose**: Prevents naming conflicts

### Storage Settings

- **Cache**: 1 hour (3600 seconds)
- **Upsert**: Disabled (prevents overwriting)
- **Public**: Yes (anyone can view)

---

## 💡 Tips

### Image Quality
- Use high-quality images (at least 1200px wide)
- Compress images before upload to reduce size
- Use JPG for photos, PNG for graphics

### Image Size
- Keep under 5MB for faster uploads
- Recommended: 1-2MB for good quality
- Use online tools to compress if needed

### Image Format
- JPG: Best for photos
- PNG: Best for graphics with transparency
- WebP: Modern format, smaller size

### Best Practices
- Use descriptive file names
- Test upload with small image first
- Keep backup of original images
- Use consistent image dimensions

---

## 🐛 Troubleshooting

### "Image size must be less than 5MB"
- **Solution**: Compress your image using online tools
- **Tools**: TinyPNG, Squoosh, ImageOptim

### "Please select an image file"
- **Solution**: Make sure you selected an image file (JPG, PNG, etc.)
- **Not supported**: PDF, DOC, ZIP files

### Upload takes too long
- **Solution**: Check your internet connection
- **Solution**: Use smaller image (compress it)
- **Solution**: Try different image format

### Image doesn't appear
- **Solution**: Wait for upload to complete
- **Solution**: Check browser console for errors
- **Solution**: Verify Supabase storage is enabled

### "Failed to upload image"
- **Solution**: Check Supabase storage policies
- **Solution**: Verify storage bucket exists
- **Solution**: Check internet connection

---

## 🔒 Security

### Storage Policies

Your storage has these policies:

```sql
-- Public can view images
CREATE POLICY "Public can view project images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload project images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');
```

### For Production

1. Add authentication to admin panel
2. Only authenticated users can upload
3. Add rate limiting
4. Add virus scanning (optional)

---

## 📊 What Changed

### Files Created
- ✅ `src/lib/storage.ts` - Image upload/delete functions

### Files Updated
- ✅ `supabase-schema.sql` - Fixed bucket creation
- ✅ `components/admin/ProjectManager.tsx` - Added image upload UI

### New Features
- ✅ Upload from device
- ✅ Image preview
- ✅ Remove image button
- ✅ Upload progress indicator
- ✅ File validation
- ✅ Error handling

---

## ✅ Checklist

- [ ] Storage bucket exists (ignore error if already exists)
- [ ] Start development server (`npm run dev`)
- [ ] Go to admin panel (`http://localhost:5173/admin`)
- [ ] Click "Projects" tab
- [ ] Click "Add Project"
- [ ] Click "Choose image from device"
- [ ] Select an image
- [ ] See image preview
- [ ] Fill in other fields
- [ ] Click "Add Project"
- [ ] Wait for upload to complete
- [ ] View project on homepage with uploaded image

---

## 🎉 You're Ready!

You can now **upload images directly from your device** when adding projects! No more copying and pasting URLs - just select an image and it uploads automatically.

**Try it now:**
1. Go to admin panel
2. Add a project
3. Upload an image from your device
4. See it appear on your website!

🚀 **Image uploads are working!**
