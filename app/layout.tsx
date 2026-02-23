import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Rights Issue Acceptance/Renunciation e-Form',
  description: 'Submit your rights issue acceptance or renunciation application online',
  generator: 'v0.app',
  icons: {
    icon: '/apple-icon.png',
    shortcut: '/apple-icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    images: [
      {
        url: '/apple-icon.png',
        width: 180,
        height: 180,
        alt: 'Crescent Registrars Limited logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    images: ['/apple-icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
