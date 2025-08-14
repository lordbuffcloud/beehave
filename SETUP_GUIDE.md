## Environment variables

Create a `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# Optional if serving under a subpath
NEXT_PUBLIC_BASE_PATH=
```

# 🐝 Beehave Setup Guide

## Quick Start: Get Your App Running in 5 Minutes

### Step 1: Create Supabase Project (2 minutes)

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"** and sign up/login
3. **Create a new project:**
   - Organization: Choose or create one
   - Name: `beehave` 
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to your location
4. **Wait for project to be created** (usually 1-2 minutes)

### Step 2: Get Your API Keys (30 seconds)

1. **In your Supabase dashboard**, go to **Settings** → **API**
2. **Copy these two values:**
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)

### Step 3: Add Environment Variables (30 seconds)

1. **In your project**, update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Replace the values** with your actual Supabase URL and anon key

### Step 4: Set Up Database (1 minute)

1. **In Supabase dashboard**, go to **SQL Editor**
2. **Copy the contents** of `database/schema.sql` from your project
3. **Paste and run** the SQL to create all tables and security policies

### Step 5: Test Your App (30 seconds)

1. **Restart your dev server:**
```bash
npm run dev
```

2. **Visit** `http://localhost:3000`
3. **Go to** `http://localhost:3000/auth/login` to test the login form

### Step 6: Add App Icons (1 minute)

1. **Add placeholder icons for PWA support:**
   - Create a folder at `public/icons/` if it doesn't exist.
   - Add PNG icons with the following sizes (can be solid color or bee image):
     - icon-72x72.png
     - icon-96x96.png
     - icon-128x128.png
     - icon-144x144.png
     - icon-152x152.png
     - icon-192x192.png
     - icon-384x384.png
     - icon-512x512.png
   - You can generate these using an online favicon generator or use a simple yellow square as a placeholder.
   - Make sure the filenames match those in `public/manifest.json`.

## 🎉 That's It!

Your Beehave app is now connected to Supabase and ready for development!

### Next Steps:

- **Test the authentication** by trying to access the dashboard
- **Create your first user account** (you can sign up via the API or Supabase dashboard)
- **Start building** the family management features

### Need Help?

- **Supabase Docs**: [docs.supabase.com](https://docs.supabase.com)
- **Database Schema**: Check `database/schema.sql` for the complete structure
- **Authentication**: LoginForm component handles all auth flows

---

**Happy Buzzing! 🐝🍯** 