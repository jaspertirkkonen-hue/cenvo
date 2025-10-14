# Cenvo Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Prepare Environment Variables

Before deploying, gather your Supabase credentials from the `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mtaktjphgnamasbwlqqe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://your-deployment.vercel.app/auth/callback
```

### Step 2: Deploy via Vercel CLI

1. **Install Vercel CLI (if not installed):**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy to preview:**
   ```bash
   cd /Users/jaspertirkkonen/Desktop/PromptXchange
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **cenvo** (or your preferred name)
   - Directory? **./ (default)**
   - Override settings? **N**

5. **Add environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   # Paste: https://mtaktjphgnamasbwlqqe.supabase.co
   
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   # Paste the anon key from above
   
   vercel env add NEXT_PUBLIC_SUPABASE_REDIRECT_URL
   # Paste: https://your-deployment.vercel.app/auth/callback
   ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Step 3: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import Git Repository** (or upload the project folder)
4. **Configure Project:**
   - Framework Preset: **Next.js**
   - Root Directory: **./`**
   - Build Command: **`npm run build`** (default)
   - Output Directory: **`.next`** (default)

5. **Add Environment Variables:**
   
   Navigate to **Settings → Environment Variables** and add:
   
   | Name | Value | Environments |
   |------|-------|--------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://mtaktjphgnamasbwlqqe.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` | `https://your-deployment.vercel.app/auth/callback` | Production, Preview, Development |

6. **Click "Deploy"**

### Step 4: Update Supabase OAuth Settings

After your first deployment, you'll receive a Vercel URL (e.g., `https://cenvo.vercel.app`).

1. **Go to your Supabase Dashboard**
2. **Navigate to Authentication → URL Configuration**
3. **Update the following:**
   - **Site URL:** `https://cenvo.vercel.app`
   - **Redirect URLs:** Add `https://cenvo.vercel.app/auth/callback`

4. **For OAuth providers (Google, GitHub):**
   - Go to **Authentication → Providers**
   - Ensure Google and GitHub are enabled
   - Update authorized redirect URIs in Google Cloud Console and GitHub OAuth App settings

### Step 5: Update Environment Variables

After deployment, update the redirect URL:

```bash
vercel env rm NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
vercel env add NEXT_PUBLIC_SUPABASE_REDIRECT_URL production
# Enter: https://your-actual-deployment.vercel.app/auth/callback
```

Then redeploy:
```bash
vercel --prod
```

## 🔧 Troubleshooting

### OAuth Redirect Issues

If you encounter "No page found" after OAuth login:

1. Verify `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` in Vercel matches your deployment URL
2. Ensure the URL is added to Supabase's allowed redirect URLs
3. Check that `/auth/callback/route.ts` exists and is correctly configured

### Build Failures

If the build fails on Vercel:

1. Check the build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript types are correct
4. Clear Vercel cache and redeploy

### Environment Variables Not Loading

1. Ensure all env vars start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding environment variables
3. Check that variables are set for the correct environment (Production/Preview/Development)

## 📊 Post-Deployment Checklist

- [ ] Verify home page loads at your Vercel URL
- [ ] Test login with email/password
- [ ] Test Google OAuth login
- [ ] Test GitHub OAuth login
- [ ] Confirm redirect to `/overview` after successful login
- [ ] Test protected routes (should redirect to `/login` when not authenticated)
- [ ] Check all static pages (pricing, about)
- [ ] Verify Tailwind CSS is applied correctly
- [ ] Test responsive design on mobile
- [ ] Check Lighthouse scores (Performance, Accessibility, Best Practices)

## 🌍 Custom Domain (Optional)

To use a custom domain (e.g., `cenvo.io`):

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` to use your custom domain
5. Update Supabase OAuth settings with the new domain

## 📈 Monitoring

After deployment, monitor your application:

- **Vercel Analytics:** Track page views and performance
- **Vercel Logs:** View runtime logs and errors
- **Supabase Dashboard:** Monitor authentication and database usage

---

**Need help?** Check the [Vercel documentation](https://vercel.com/docs) or [Supabase documentation](https://supabase.com/docs).

