import type { Metadata } from 'next'
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
      <body>
        {/* Removed Social Media Icons Overlay */}
        {children}
      </body>
    </html>
  )
}
