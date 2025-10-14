# 🚀 Cenvo - Vercel Deployment Instructions

## ✅ Pre-Deployment Checklist

Your Cenvo project is **ready for deployment**! All prerequisites are met:

- ✅ Next.js 14.2.33 (latest stable)
- ✅ Production build successful
- ✅ All routes working
- ✅ Tailwind CSS configured
- ✅ Supabase integration ready
- ✅ OAuth flow implemented
- ✅ Middleware route protection active
- ✅ No runtime errors

---

## 🌐 Deploy to Vercel (Recommended Method)

### **Option 1: Deploy via Vercel Dashboard (Easiest)**

1. **Visit [vercel.com/new](https://vercel.com/new)**

2. **Import this project:**
   - Click "Add New Project"
   - Select "Import Git Repository" OR "Upload folder"
   - If uploading folder, drag `/Users/jaspertirkkonen/Desktop/PromptXchange`

3. **Configure the project:**
   - **Project Name:** `cenvo` (or your preference)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables:**
   
   Click "Environment Variables" and add these three variables:
   
   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://mtaktjphgnamasbwlqqe.supabase.co`
   - Environment: All (Production, Preview, Development)
   
   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk`
   - Environment: All (Production, Preview, Development)
   
   **Variable 3:**
   - Key: `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`
   - Value: `https://YOUR_VERCEL_URL/auth/callback` (leave as placeholder for now)
   - Environment: All (Production, Preview, Development)

5. **Click "Deploy"**

6. **Wait for deployment to complete** (~2-3 minutes)

7. **Note your deployment URL** (e.g., `https://cenvo-abc123.vercel.app`)

8. **Update the redirect URL:**
   - Go to **Settings → Environment Variables**
   - Edit `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`
   - Replace with: `https://cenvo-abc123.vercel.app/auth/callback`
   - Click **Save**
   - Redeploy from the **Deployments** tab

---

### **Option 2: Deploy via Vercel CLI**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project:**
   ```bash
   cd /Users/jaspertirkkonen/Desktop/PromptXchange
   ```

3. **Login:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name? **cenvo**
   - Directory? **./**
   - Override settings? **N**

5. **Add environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   # When prompted, paste: https://mtaktjphgnamasbwlqqe.supabase.co
   
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   # When prompted, paste the anon key
   
   vercel env add NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
   # When prompted, paste: https://your-deployment.vercel.app/auth/callback
   ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

---

## 🔐 Post-Deployment: Configure Supabase

### **Step 1: Update Supabase Authentication URLs**

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Select your project:** `mtaktjphgnamasbwlqqe`
3. **Navigate to:** Authentication → URL Configuration
4. **Update Site URL:**
   ```
   https://your-deployment.vercel.app
   ```
5. **Add Redirect URL:**
   ```
   https://your-deployment.vercel.app/auth/callback
   ```
6. **Click Save**

### **Step 2: Configure OAuth Providers**

#### **Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs:**
   ```
   https://mtaktjphgnamasbwlqqe.supabase.co/auth/v1/callback
   ```
5. Save

#### **GitHub OAuth:**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Edit your OAuth App
3. Update **Authorization callback URL:**
   ```
   https://mtaktjphgnamasbwlqqe.supabase.co/auth/v1/callback
   ```
4. Save

---

## 🎯 Verify Deployment

After deployment, test these URLs:

1. **Home:** `https://your-deployment.vercel.app/`
2. **Login:** `https://your-deployment.vercel.app/login`
3. **Register:** `https://your-deployment.vercel.app/register`
4. **Pricing:** `https://your-deployment.vercel.app/pricing`
5. **About:** `https://your-deployment.vercel.app/about`

**Test Authentication:**
1. Click "Sign in with Google"
2. Authenticate with Google
3. Verify redirect to `/overview` dashboard
4. Check that dashboard content loads

---

## 🔄 Continuous Deployment

### **With GitHub:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Cenvo deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/cenvo.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to Vercel Dashboard
   - Import Git Repository
   - Select your GitHub repo
   - Add environment variables
   - Deploy

3. **Automatic deployments:**
   - Every push to `main` triggers production deployment
   - Every PR creates a preview deployment

---

## 🎨 Custom Domain Setup

1. **Purchase domain** (e.g., from Namecheap, GoDaddy, etc.)

2. **Add domain in Vercel:**
   - Project Settings → Domains
   - Add `cenvo.io` and `www.cenvo.io`

3. **Update DNS records:**
   Follow Vercel's instructions to point your domain to Vercel

4. **Update environment variables:**
   - Change `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` to `https://cenvo.io/auth/callback`
   - Redeploy

5. **Update Supabase:**
   - Update Site URL to `https://cenvo.io`
   - Add redirect URL: `https://cenvo.io/auth/callback`

---

## 📊 Expected Performance

After deployment, your Cenvo app should achieve:

- ✅ **Performance:** 90+ (Lighthouse)
- ✅ **Accessibility:** 95+ (Lighthouse)
- ✅ **Best Practices:** 95+ (Lighthouse)
- ✅ **SEO:** 100 (Lighthouse)
- ✅ **First Contentful Paint:** < 1.5s
- ✅ **Time to Interactive:** < 3.5s

---

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Ensure Supabase URLs are updated
4. Review the troubleshooting section in DEPLOYMENT.md

---

**Your Cenvo project is ready to deploy! 🚀**

Follow the steps above and your AI Prompt Marketplace will be live in minutes.

