import './globals.css'
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { ToastProvider } from '@/components/ToastProvider'
import CommandPalette from '@/components/CommandPalette'

export const runtime = 'nodejs'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Cenvo – AI Prompt Marketplace',
    template: '%s | Cenvo',
  },
  description: 'Buy and sell high-quality AI prompts. Power your generative AI applications with the best data.',
  metadataBase: new URL('https://cenvo.io'),
  keywords: ['AI prompts', 'prompt marketplace', 'generative AI', 'ChatGPT prompts', 'AI tools'],
  authors: [{ name: 'Cenvo' }],
  openGraph: {
    title: 'Cenvo – AI Prompt Marketplace',
    description: 'Buy and sell high-quality AI prompts. Power your generative AI applications.',
    url: 'https://cenvo.io',
    siteName: 'Cenvo',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/cenvo-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Cenvo AI Prompt Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cenvo – AI Prompt Marketplace',
    description: 'Buy and sell high-quality AI prompts',
    images: ['/images/cenvo-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  // Performance optimizations
  other: {
    'X-DNS-Prefetch-Control': 'on',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/cenvo-logo.svg" type="image/svg+xml" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#030712" />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-sans min-h-screen bg-[#030712] text-[#f1f5f9] antialiased`}>
        {/* Load Supabase and analytics scripts */}
        <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="afterInteractive" />
        <Script id="analytics-placeholder" strategy="lazyOnload">
          {`window.__CENVO_ANALYTICS__ = true;`}
        </Script>
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 opacity-60 will-change-transform bg-[radial-gradient(800px_600px_at_25%_35%,rgba(37,99,235,0.12),transparent_70%)]" />
        </div>
        <ToastProvider>
          <div className="relative">
            <CommandPalette />
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}