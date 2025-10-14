# Cenvo - AI Prompt Marketplace

Power Generative AI With Your Data. Make the best models with the best data.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework:** Next.js 14.2.33 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Auth (Email/Password, Google OAuth, GitHub OAuth)
- **Database:** Supabase
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🎨 Features

- Modern dark-themed UI with Cenvo branding
- Server-side rendering with Next.js App Router
- Middleware-based route protection
- OAuth authentication (Google, GitHub)
- Responsive design optimized for all devices
- GPU-accelerated animations
- Accessibility-focused (WCAG AA compliant)
- SEO optimized with proper meta tags

## 🌐 Deployment to Vercel

### Environment Variables

In your Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://mtaktjphgnamasbwlqqe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://your-domain.vercel.app/auth/callback
```

**Important:** Update `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` to match your Vercel deployment URL.

### Supabase Configuration

After deploying to Vercel, update your Supabase project settings:

1. Go to **Authentication → URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://your-domain.vercel.app`
3. Add to **Redirect URLs**: `https://your-domain.vercel.app/auth/callback`

### Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Deploy with GitHub

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy automatically on every push to main

## 📁 Project Structure

```
PromptXchange/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── overview/
│   │   │   ├── market/
│   │   │   ├── myprompts/
│   │   │   ├── chat/
│   │   │   └── settings/
│   │   ├── auth/
│   │   │   └── callback/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── pricing/
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── nav/
│   │   │   └── TopNav.tsx
│   │   ├── cards/
│   │   │   ├── KpiCard.tsx
│   │   │   └── PromptCard.tsx
│   │   ├── graphics/
│   │   │   ├── MeshBG.tsx
│   │   │   ├── AiCard1.tsx
│   │   │   └── AiCard2.tsx
│   │   └── DashboardNavbar.tsx
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── server.ts
│   └── middleware.ts
├── public/
│   └── images/
│       └── cenvo-logo.svg
├── .env.local
├── vercel.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🔒 Authentication Flow

1. User visits `/login` or `/register`
2. Enters credentials or selects OAuth provider
3. Supabase handles authentication
4. OAuth redirects to `/auth/callback`
5. Session established and user redirected to `/overview`
6. Middleware protects dashboard routes

## 🎯 Routes

### Pre-Login (Public)
- `/` - Home page
- `/pricing` - Pricing tiers
- `/about` - About Cenvo
- `/login` - Sign in
- `/register` - Sign up

### Post-Login (Protected)
- `/overview` - Dashboard overview
- `/market` - Prompt marketplace
- `/myprompts` - User's prompts
- `/chat` - AI assistant
- `/settings` - Account settings

## 📝 License

© 2025 Cenvo. All rights reserved.

