import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '../components/Header'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DinoVerse — Walk Among Giants',
    template: '%s · DinoVerse',
  },
  description:
    'A field guide to the Mesozoic — meet famous dinosaurs in 3D, next to a human for scale, and explore their families and eras.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: 'DinoVerse',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
