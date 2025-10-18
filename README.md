# Tamarsan Renewable Energy Website


## 🔐 Admin Authentication

### Login Credentials
- **Email**: `admin@tamarsan.com`
- **Password**: `Tamarsan@2024!Secure`
- Stored in `.env.local` file

### Access Admin Panel
1. Go to: `http://localhost:5173/login`
2. Enter your credentials
3. Click "Sign In"

### Features
- ✅ Secure email/password authentication
- ✅ Forgot password functionality
- ✅ Help Center for support
- ✅ Protected admin routes

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment (.env.local)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAIL=admin@tamarsan.com
VITE_ADMIN_PASSWORD=Tamarsan@2024!Secure
```

### 3. Setup Database
1. Go to Supabase Dashboard → SQL Editor
2. Run `COMPLETE_SETUP_ONE_TIME.sql`
3. Create admin user in Authentication → Users

### 4. Start Development
```bash
npm run dev
```

## 📚 Documentation

- **Login**: `/login` - Admin authentication
- **Admin Panel**: `/admin` - Manage content
- **Help Center**: `/help` - Get support

## ✨ Features

- Secure authentication with Supabase Auth
- Services management with icon selection
- Projects management with image upload
- Testimonials management with ratings
- Real-time database updates
- Responsive design with dark mode

**Ready to use! 🚀**
