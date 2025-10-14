# 🌐 Connect cenvo.io to Vercel - Complete Guide

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Deployed your Cenvo project to Vercel
- ✅ Access to your domain registrar (where you purchased cenvo.io)
- ✅ Vercel account with the Cenvo project

---

## 🎯 Step-by-Step Domain Configuration

### **Step 1: Add Domain in Vercel**

1. **Go to your Vercel project dashboard:**
   - Navigate to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your **Cenvo** project

2. **Add custom domain:**
   - Click **Settings** in the top navigation
   - Click **Domains** in the left sidebar
   - Click **Add** or **Add Domain**

3. **Enter your domains:**
   - Add `cenvo.io` (primary domain)
   - Add `www.cenvo.io` (subdomain)
   - Click **Add**

4. **Vercel will show domain status:**
   - ⚠️ Invalid Configuration (this is expected - we need to update DNS)

---

### **Step 2: Get DNS Configuration from Vercel**

After adding the domain, Vercel will provide DNS records. Here's what you'll need:

#### **For cenvo.io (apex domain):**

**Option A: A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option B: CNAME with ALIAS**
```
Type: CNAME (or ALIAS)
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### **For www.cenvo.io (subdomain):**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

### **Step 3: Configure DNS at Your Domain Registrar**

#### **If using Namecheap:**

1. Login to [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → Select **cenvo.io**
3. Click **Manage** → **Advanced DNS**
4. Add these records:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | 76.76.21.21 | Automatic |
   | CNAME Record | www | cname.vercel-dns.com | Automatic |

5. **Remove any conflicting records:**
   - Delete any existing A records for `@`
   - Delete any existing CNAME records for `www`
   - Keep MX records (email)
   - Keep TXT records (verification)

6. Click **Save All Changes**

#### **If using GoDaddy:**

1. Login to [GoDaddy](https://www.godaddy.com)
2. Go to **My Products** → **Domains** → **DNS** for cenvo.io
3. Add these records:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | 76.76.21.21 | 1 Hour |
   | CNAME | www | cname.vercel-dns.com | 1 Hour |

4. Click **Save**

#### **If using Cloudflare:**

1. Login to [Cloudflare](https://dash.cloudflare.com)
2. Select **cenvo.io** domain
3. Go to **DNS** → **Records**
4. Add these records:

   | Type | Name | Content | Proxy status | TTL |
   |------|------|---------|--------------|-----|
   | A | @ | 76.76.21.21 | DNS only (gray cloud) | Auto |
   | CNAME | www | cname.vercel-dns.com | DNS only (gray cloud) | Auto |

   **IMPORTANT:** Set proxy status to **DNS only** (gray cloud icon)

5. Click **Save**

#### **Other Registrars (Generic Instructions):**

Add these DNS records:
```
A Record:
  Host/Name: @ (or leave blank for apex)
  Value/Points to: 76.76.21.21
  TTL: 3600 or Automatic

CNAME Record:
  Host/Name: www
  Value/Points to: cname.vercel-dns.com
  TTL: 3600 or Automatic
```

---

### **Step 4: Verify Domain Configuration**

1. **Wait for DNS propagation** (5 minutes to 48 hours, usually ~10-30 minutes)

2. **Check DNS propagation:**
   - Visit [dnschecker.org](https://dnschecker.org)
   - Enter `cenvo.io`
   - Verify A record points to `76.76.21.21`
   - Enter `www.cenvo.io`
   - Verify CNAME points to `cname.vercel-dns.com`

3. **Check Vercel dashboard:**
   - Go to your project → Settings → Domains
   - Status should change from ⚠️ to ✅ when DNS is configured correctly

---

### **Step 5: Update Environment Variables**

Once domain is connected, update your environment variable:

1. **Go to Vercel Settings → Environment Variables**
2. **Edit** `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`
3. **Update to:** `https://cenvo.io/auth/callback`
4. **Save** and **Redeploy**

---

### **Step 6: Update Supabase Configuration**

1. **Go to Supabase Dashboard:**
   [https://supabase.com/dashboard/project/mtaktjphgnamasbwlqqe](https://supabase.com/dashboard/project/mtaktjphgnamasbwlqqe)

2. **Authentication → URL Configuration:**
   - **Site URL:** `https://cenvo.io`
   - **Redirect URLs:** Add both:
     - `https://cenvo.io/auth/callback`
     - `https://www.cenvo.io/auth/callback`

3. Click **Save**

---

### **Step 7: Test Your Custom Domain** 🎉

Visit these URLs and verify:

- ✅ `https://cenvo.io` - Home page loads
- ✅ `https://www.cenvo.io` - Redirects to https://cenvo.io
- ✅ `https://cenvo.io/login` - Login page styled correctly
- ✅ `https://cenvo.io/pricing` - Pricing page loads
- ✅ Google OAuth redirects correctly
- ✅ After login, redirects to `https://cenvo.io/overview`

---

## 🔧 Troubleshooting

### **Domain shows "Invalid Configuration"**

- **Cause:** DNS records not propagated yet
- **Solution:** Wait 10-30 minutes, check DNS propagation at dnschecker.org

### **SSL Certificate Error**

- **Cause:** Vercel is provisioning the certificate
- **Solution:** Wait 5-10 minutes, Vercel auto-provisions Let's Encrypt SSL

### **OAuth Redirect Error**

- **Cause:** Environment variable or Supabase not updated
- **Solution:** 
  1. Update `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` to `https://cenvo.io/auth/callback`
  2. Update Supabase redirect URLs to include `https://cenvo.io/auth/callback`
  3. Redeploy

### **www subdomain not working**

- **Cause:** CNAME record missing or incorrect
- **Solution:** Add CNAME record: `www` → `cname.vercel-dns.com`

---

## 📊 DNS Configuration Summary

**Copy these exact values for your DNS provider:**

### **For Apex Domain (cenvo.io):**
```
Type: A
Host: @ (or blank)
Value: 76.76.21.21
TTL: 3600 (or Automatic)
```

### **For WWW Subdomain (www.cenvo.io):**
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: 3600 (or Automatic)
```

---

## ✅ Verification Commands

Check DNS configuration from terminal:

```bash
# Check A record
dig cenvo.io +short
# Should return: 76.76.21.21

# Check CNAME record
dig www.cenvo.io +short
# Should return: cname.vercel-dns.com

# Check if site is live
curl -I https://cenvo.io
# Should return: HTTP/2 200
```

---

## 🎯 Final Checklist

After domain setup:

- [ ] DNS records added at registrar
- [ ] DNS propagation verified (dnschecker.org)
- [ ] Vercel domain status shows ✅
- [ ] SSL certificate provisioned (automatic)
- [ ] Environment variable updated with cenvo.io
- [ ] Supabase redirect URLs updated
- [ ] Redeployed after config changes
- [ ] Tested: https://cenvo.io loads correctly
- [ ] Tested: OAuth login works with custom domain
- [ ] Tested: All routes accessible

---

## 🚀 Timeline

- **Add DNS records:** 2 minutes
- **DNS propagation:** 10-30 minutes (can take up to 48 hours)
- **SSL provisioning:** 5-10 minutes (automatic)
- **Vercel verification:** Instant after DNS propagates
- **Total estimated time:** 20-45 minutes

---

## 📞 Need Help?

**Vercel Support:**
- [Vercel Custom Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

**DNS Propagation Check:**
- [dnschecker.org](https://dnschecker.org)
- [whatsmydns.net](https://www.whatsmydns.net)

---

**Your Cenvo app will be live at https://cenvo.io once DNS propagates!** 🎉

