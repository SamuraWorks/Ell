import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import {
  Playfair_Display,
  Cormorant_Garamond,
  Dancing_Script,
  Jost,
} from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ella @ 20 — A Private Digital Experience',
  description: 'A cinematic love letter. Twenty years of being exactly who you are.',
  openGraph: {
    title: 'Ella @ 20',
    description: 'A private digital archive and love letter.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#F9E8E8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dancing.variable} ${jost.variable}`}
    >
      <body className="bg-background font-jost antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
