# Database Connection Guide

## Overview
Your Tamarsan website is now fully connected to Supabase! When you add, update, or delete projects, services, or testimonials from the admin panel, the changes will automatically appear on the frontend.

## How It Works

### 1. Database (Supabase)
- **Location**: Your Supabase project at `https://mwbdqffwlywrsuqadxke.supabase.co`
- **Tables**: 
  - `projects` - Stores project information
  - `services` - Stores service offerings
  - `testimonials` - Stores customer testimonials
- **Schema**: Defined in `supabase-schema.sql`

### 2. Connection Layer
- **File**: `src/lib/supabase.ts`
- **Purpose**: Creates the Supabase client that connects to your database
- **Environment Variables**: Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env.local`

### 3. Data Hooks (React Hooks)
These hooks handle all database operations:

#### `src/hooks/useServices.ts`
- `services` - Array of all services
- `loading` - Loading state
- `addService(data)` - Add new service
- `updateService(id, data)` - Update existing service
- `deleteService(id)` - Delete service
- `refetch()` - Refresh data

#### `src/hooks/useProjects.ts`
- `projects` - Array of all projects
- `loading` - Loading state
- `addProject(data)` - Add new project
- `updateProject(id, data)` - Update existing project
- `deleteProject(id)` - Delete project
- `refetch()` - Refresh data

#### `src/hooks/useTestimonials.ts`
- `testimonials` - Array of all testimonials
- `loading` - Loading state
- `addTestimonial(data)` - Add new testimonial
- `updateTestimonial(id, data)` - Update existing testimonial
- `deleteTestimonial(id)` - Delete testimonial
- `refetch()` - Refresh data

### 4. Admin Panel (CRUD Operations)
Located at `/admin` route:

#### `components/admin/ServiceManager.tsx`
- Add, edit, and delete services
- Form with title and description fields
- Real-time updates to database

#### `components/admin/ProjectManager.tsx`
- Add, edit, and delete projects
- Form with name, date, location, description, image URL, and rating
- Real-time updates to database

#### `components/admin/TestimonialManager.tsx`
- Add, edit, and delete testimonials
- Form with rating (1-5 stars), description, role, and location
- Real-time updates to database

### 5. Frontend Display Components
These components automatically show data from the database:

#### `components/ServiceCards.tsx`
- Displays services on the homepage
- Shows first 3 services from database
- Falls back to default services if database is empty

#### `components/ProjectsPreview.tsx`
- Displays projects on the homepage
- Shows projects from database
- Falls back to default projects if database is empty

#### `components/TestimonialsPreview.tsx`
- Displays testimonials on the homepage
- Shows testimonials from database
- Falls back to default testimonials if database is empty

#### `pages/Services.tsx`
- Full services page (currently uses static data)

#### `pages/Projects.tsx`
- Full projects page
- Shows all projects from database
- Falls back to default projects if database is empty

#### `pages/Testimonials.tsx`
- Full testimonials page with carousel
- Shows all testimonials from database
- Falls back to default testimonials if database is empty

## How to Use

### Adding Data via Admin Panel

1. **Navigate to Admin**: Go to `http://localhost:5173/admin` (or your deployed URL + `/admin`)

2. **Add a Service**:
   - Click "Add Service" button
   - Fill in title and description
   - Click "Add Service" to save
   - Service appears immediately on frontend

3. **Add a Project**:
   - Click "Add Project" button
   - Fill in all fields:
     - Name (required)
     - Date (required, e.g., "2023-2024")
     - Location (required)
     - Description (required)
     - Image URL (optional)
     - Rate (optional, 0-5)
   - Click "Add Project" to save
   - Project appears immediately on frontend

4. **Add a Testimonial**:
   - Click "Add Testimonial" button
   - Select rating (1-5 stars)
   - Fill in description, role, and location
   - Click "Add Testimonial" to save
   - Testimonial appears immediately on frontend

### Editing Data

1. Click the pencil icon (✏️) on any item
2. Form opens with current data
3. Make changes
4. Click "Update" to save
5. Changes appear immediately on frontend

### Deleting Data

1. Click the trash icon (🗑️) on any item
2. Confirm deletion
3. Item is removed from database and frontend

## Data Flow

```
User Action (Admin Panel)
    ↓
React Hook Function (add/update/delete)
    ↓
Supabase Client (src/lib/supabase.ts)
    ↓
Supabase Database
    ↓
React Hook Updates State
    ↓
Frontend Components Re-render
    ↓
User Sees Updated Data
```

## Security

### Row Level Security (RLS)
Your database has RLS enabled:
- **Public Read**: Anyone can view projects, services, and testimonials
- **Authenticated Write**: Only authenticated users can add, update, or delete data

### Current Setup
- Currently using anonymous key (public access)
- For production, you should add authentication to the admin panel

### Recommended Next Steps for Production
1. Add authentication to `/admin` route
2. Use Supabase Auth for user management
3. Restrict admin access to authenticated users only

## Troubleshooting

### Data Not Showing
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Check network tab to see if API calls are successful
4. Verify RLS policies in Supabase dashboard

### Can't Add/Edit/Delete
1. Check if you're authenticated (if auth is enabled)
2. Verify RLS policies allow the operation
3. Check browser console for error messages
4. Verify data format matches database schema

### Images Not Loading
1. Verify image URL is valid and accessible
2. Check if image URL starts with `http://` or `https://`
3. Consider using Supabase Storage for image hosting

## Database Schema Reference

### Projects Table
```sql
- id: UUID (auto-generated)
- name: TEXT (required)
- date: DATE (required)
- location: TEXT (required)
- description: TEXT (required)
- image_url: TEXT (optional)
- rate: DECIMAL(3,2) (optional, 0-5)
- created_at: TIMESTAMP (auto-generated)
- updated_at: TIMESTAMP (auto-updated)
```

### Services Table
```sql
- id: UUID (auto-generated)
- title: TEXT (required)
- description: TEXT (required)
- created_at: TIMESTAMP (auto-generated)
- updated_at: TIMESTAMP (auto-updated)
```

### Testimonials Table
```sql
- id: UUID (auto-generated)
- rate: DECIMAL(3,2) (optional, 0-5)
- description: TEXT (required)
- role: TEXT (required)
- location: TEXT (required)
- created_at: TIMESTAMP (auto-generated)
- updated_at: TIMESTAMP (auto-updated)
```

## Testing the Connection

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open the admin panel**:
   - Navigate to `http://localhost:5173/admin`

3. **Add a test service**:
   - Click "Add Service"
   - Title: "Test Service"
   - Description: "This is a test"
   - Click "Add Service"

4. **Verify on frontend**:
   - Navigate to `http://localhost:5173`
   - Scroll to services section
   - You should see your test service

5. **Clean up**:
   - Go back to admin panel
   - Delete the test service

## Success! 🎉

Your database is now fully connected! Any changes you make in the admin panel will immediately appear on the frontend. The system uses real-time React hooks to keep everything in sync.
