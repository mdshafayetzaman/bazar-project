import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from './ component/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'বাংলা নিউজ | Bangla News',
  description: 'বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <Nav />
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  )
}
