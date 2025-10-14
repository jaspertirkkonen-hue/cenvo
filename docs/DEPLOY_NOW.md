# 🚀 Deploy Cenvo to Vercel NOW - Step-by-Step Guide

## ✅ Your Project is 100% Ready to Deploy!

All configuration files, optimizations, and environment variables are set up. Follow these exact steps:

---

## 🎯 Method 1: Vercel Dashboard (5 Minutes - RECOMMENDED)

### **Step 1: Go to Vercel**
Open [vercel.com/new](https://vercel.com/new) in your browser

### **Step 2: Upload Project**
Click **"Browse"** and select this folder:
```
/Users/jaspertirkkonen/Desktop/PromptXchange
```

Or drag and drop the folder into the Vercel upload area.

### **Step 3: Configure Project**
Vercel will auto-detect Next.js. Verify these settings:
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅

### **Step 4: Add Environment Variables**

Click **"Environment Variables"** and add these **3 variables**:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://mtaktjphgnamasbwlqqe.supabase.co
Environment: Production, Preview, Development (select all)
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk
Environment: Production, Preview, Development (select all)
```

**Variable 3:**
```
Name: NEXT_PUBLIC_SUPABASE_REDIRECT_URL
Value: PLACEHOLDER
Environment: Production, Preview, Development (select all)
```
*(We'll update this after getting the deployment URL)*

### **Step 5: Deploy**
Click the big **"Deploy"** button and wait 2-3 minutes.

### **Step 6: Get Your URL**
After deployment completes, Vercel will show your URL (e.g., `https://cenvo-abc123.vercel.app`)

**COPY THIS URL!**

### **Step 7: Update Redirect URL**
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`
3. Click **Edit**
4. Replace `PLACEHOLDER` with: `https://your-actual-url.vercel.app/auth/callback`
5. Click **Save**
6. Go to **Deployments** tab
7. Click **⋯** (three dots) on the latest deployment
8. Click **Redeploy**

### **Step 8: Configure Supabase**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/mtaktjphgnamasbwlqqe)
2. Navigate to **Authentication** → **URL Configuration**
3. Update **Site URL** to: `https://your-vercel-url.vercel.app`
4. Add to **Redirect URLs**: `https://your-vercel-url.vercel.app/auth/callback`
5. Click **Save**

### **Step 9: Test Your Deployment** 🎉
Visit your Vercel URL and test:
- ✅ Home page loads
- ✅ Login page styled correctly
- ✅ Google OAuth works
- ✅ Redirects to `/overview` after login

---

## 🎯 Method 2: Vercel CLI (For Advanced Users)

### **Step 1: Login to Vercel**
```bash
npx vercel login
```
Follow the email confirmation link.

### **Step 2: Deploy Preview**
```bash
cd /Users/jaspertirkkonen/Desktop/PromptXchange
npx vercel
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? (Select your account)
- Link to existing project? **N**
- Project name? **cenvo**
- Directory? **./`** (press Enter)
- Override settings? **N**

### **Step 3: Add Environment Variables**
```bash
# Add Supabase URL
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://mtaktjphgnamasbwlqqe.supabase.co

# Add Supabase Anon Key
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk

# Add Redirect URL (temporary)
npx vercel env add NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
# Paste: https://cenvo.vercel.app/auth/callback
```

### **Step 4: Deploy to Production**
```bash
npx vercel --prod
```

### **Step 5: Update Redirect URL**
After deployment, note your URL and update:
```bash
npx vercel env rm NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
# Enter your actual URL: https://cenvo-xyz.vercel.app/auth/callback

# Redeploy
npx vercel --prod
```

---

## 📊 Your Environment Variables

**Copy these for Vercel:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://mtaktjphgnamasbwlqqe.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk

NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://YOUR_VERCEL_URL/auth/callback
```

*(Update the third variable after you get your Vercel URL)*

---

## 🔧 Post-Deployment Configuration

### **Update Supabase (CRITICAL for OAuth):**

1. **Go to Supabase Dashboard:**
   [https://supabase.com/dashboard/project/mtaktjphgnamasbwlqqe](https://supabase.com/dashboard/project/mtaktjphgnamasbwlqqe)

2. **Authentication → URL Configuration:**
   - Site URL: `https://your-vercel-url.vercel.app`
   - Redirect URLs: Add `https://your-vercel-url.vercel.app/auth/callback`

3. **Authentication → Providers:**
   - Verify Google OAuth is enabled
   - Verify GitHub OAuth is enabled

---

## ✅ Deployment Checklist

After deploying, verify:

- [ ] Home page loads correctly
- [ ] Login page is styled (dark theme with Cenvo branding)
- [ ] Email/password login works
- [ ] Google OAuth redirects correctly
- [ ] GitHub OAuth redirects correctly
- [ ] User is redirected to `/overview` after login
- [ ] Protected routes redirect to `/login` when not authenticated
- [ ] All static pages load (pricing, about)
- [ ] Mobile responsive design works
- [ ] Lighthouse scores are good (>90)

---

## 🎉 Your Deployment URL

After following the steps above, your Cenvo app will be live at:

**https://cenvo-[random-id].vercel.app**

You can customize this to:
- **https://cenvo.vercel.app** (if available)
- Or add a custom domain like **https://cenvo.io**

---

## 📝 Notes

- ✅ Your project has been optimized for production
- ✅ All routes are working
- ✅ Build completes successfully
- ✅ No runtime errors
- ✅ Tailwind CSS is production-ready
- ✅ Supabase integration is configured
- ✅ OAuth flow is implemented

**The deployment will take approximately 2-3 minutes.**

---

## 🆘 Need Help?

If deployment fails:
1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Ensure Supabase URLs are correct
4. Review `DEPLOYMENT.md` for troubleshooting

**Good luck with your deployment!** 🚀

