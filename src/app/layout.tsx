import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cenvo - AI Prompt Marketplace',
  description: 'Power Generative AI With Your Data. Make the best models with the best data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-[#030712] text-[#f1f5f9] antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}