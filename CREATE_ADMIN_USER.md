# Create Admin User - Step by Step

## 🎯 You MUST Do This First!

The login won't work until you create the admin user in Supabase.

---

## Method 1: Supabase Dashboard (Recommended)

### Step 1: Open Supabase
Go to: https://supabase.com/dashboard/project/mwbdqffwlywrsuqadxke

### Step 2: Go to Authentication
1. Click **"Authentication"** in left sidebar
2. Click **"Users"** tab

### Step 3: Add User
1. Click **"Add user"** button (green button, top right)
2. Click **"Create new user"**

### Step 4: Fill Form
```
Email address: admin@tamarsan.com
Password: Tamarsan@2024!Secure
Auto Confirm User: ✅ MUST CHECK THIS!
```

### Step 5: Create
Click **"Create user"** button

### Step 6: Verify
You should see the user in the list with:
- Email: admin@tamarsan.com
- Status: Confirmed ✅

---

## Method 2: Using Supabase API (Alternative)

If the dashboard doesn't work, run this in your terminal:

```bash
curl -X POST 'https://mwbdqffwlywrsuqadxke.supabase.co/auth/v1/signup' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YmRxZmZ3bHl3cnN1cWFkeGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDcyODMsImV4cCI6MjA3NjMyMzI4M30.VHfMI0Kmh9vaZiHJTN4c-e58BvxbsyLEL_5s9SX_L-0" \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@tamarsan.com",
  "password": "Tamarsan@2024!Secure"
}'
```

---

## Method 3: Enable Email Confirmation Bypass

If you keep having issues:

1. Go to Supabase Dashboard
2. Click **"Authentication"** → **"Settings"**
3. Scroll to **"Email Auth"**
4. Find **"Enable email confirmations"**
5. **UNCHECK** this box (disable it)
6. Click **"Save"**
7. Now try creating the user again

---

## ✅ After Creating User

### Test Login

1. Go to: `http://localhost:5173/login`
2. Enter:
   - Email: `admin@tamarsan.com`
   - Password: `Tamarsan@2024!Secure`
3. Click **"Sign In"**
4. ✅ Should work!

---

## 🐛 Still Not Working?

### Check These:

1. **User exists?**
   - Go to Authentication → Users
   - See admin@tamarsan.com in list?

2. **User confirmed?**
   - Status should be "Confirmed" ✅
   - Not "Waiting for verification"

3. **Email confirmation disabled?**
   - Authentication → Settings
   - "Enable email confirmations" should be OFF

4. **Correct credentials?**
   - Email: admin@tamarsan.com
   - Password: Tamarsan@2024!Secure
   - Check for typos!

5. **Browser console errors?**
   - Press F12
   - Check Console tab
   - Look for error messages

---

## 📸 What You Should See

### In Supabase Dashboard:

```
Authentication → Users

┌────────────────────────────────────────────────────┐
│ Users                                    [Add user]│
├────────────────────────────────────────────────────┤
│ Email                    │ Status      │ Created  │
├──────────────────────────┼─────────────┼──────────┤
│ admin@tamarsan.com       │ Confirmed ✅│ Just now │
└────────────────────────────────────────────────────┘
```

### After Login:

```
✅ Redirected to: http://localhost:5173/admin
✅ See: Admin Dashboard
✅ Can manage: Services, Projects, Testimonials
```

---

## 🎯 Quick Fix

**Most common issue:** Email confirmation is enabled

**Solution:**
1. Supabase Dashboard
2. Authentication → Settings
3. Disable "Enable email confirmations"
4. Save
5. Create user again
6. Try login

---

**Create the user first, then login will work!** 🔐
