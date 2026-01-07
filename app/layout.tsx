import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: ' Gihomart.rw',
  description: 'My Heritage Today & Tomorrow',
  generator: 'GihomArt.rw',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4421520005037655"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* Removed Social Media Icons Overlay */}
        {children}
      </body>
    </html>
  )
}
