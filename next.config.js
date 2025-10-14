const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Standalone output for optimized Vercel deployment
  output: 'standalone',
  
  // Image optimization configuration
  images: {
    domains: ['mtaktjphgnamasbwlqqe.supabase.co'], // Add your Supabase storage domain
    formats: ['image/avif', 'image/webp'],
  },
  
  // Production optimizations
  swcMinify: true,
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://cenvo.io',
    NEXT_PUBLIC_SUPABASE_URL: 'https://mtaktjphgnamasbwlqqe.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk',
    NEXT_PUBLIC_SUPABASE_REDIRECT_URL: 'https://cenvo.io/auth/callback',
  },
  
  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
}

module.exports = nextConfig
