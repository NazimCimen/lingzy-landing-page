import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Lingzy - Learn English by Reading Real Stories',
  description: 'Improve your English naturally through classic books, short reads, and AI-generated stories. The smart way to learn vocabulary in context.',
  generator: 'v0.app',
  keywords: ['English learning', 'vocabulary', 'reading', 'language learning', 'AI stories'],
  icons: {
    icon: '/images/lingzylogo.webp',
    apple: '/images/lingzylogo.webp',
  },
}

export const viewport: Viewport = {
  themeColor: '#135db1',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
