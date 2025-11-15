"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())

  // Optional: update year dynamically if needed
  useEffect(() => {
    const timer = setInterval(() => {
      setYear(new Date().getFullYear())
    }, 1000 * 60 * 60 * 24) // daily check
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logooo.jpg"
                alt="GiHomarts Logo"
                width={40}
                height={40}
                className="rounded-full object-cover border border-orange-600"
              />
              <span className="font-bold text-xl">GiHomarts</span>
            </div>
            <p className="text-gray-400 mb-4">
              Preserving heritage for today and tomorrow through authentic cultural tourism experiences in Rwanda.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/cultural-tours" className="hover:text-white">Cultural Tours</Link></li>
              <li><Link href="/heritage-sites" className="hover:text-white">Heritage Sites</Link></li>
              <li><Link href="/community-tourism" className="hover:text-white">Community Tourism</Link></li>
              <li><Link href="/adventure-tours" className="hover:text-white">Adventure Tours</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>Southern Province, Rwanda</p>
              <p>Email: gihomart@250gmail.com</p>
              <p>Phone: +250 788 440 243</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start">
            <h4 className="font-semibold mb-4">Scan QR</h4>
            <Image
              src="/images/GIHOMARTS FINAL QR CODE[1].jpg"
              alt="GiHomarts QR Code"
              width={80}
              height={80}
              className="rounded border border-gray-300 bg-white p-1"
            />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-6">
            {/* Social Media Icons */}
            <Link href="https://facebook.com/yourpage" target="_blank" className="hover:text-blue-500">Facebook</Link>
            <Link href="https://instagram.com/yourpage" target="_blank" className="hover:text-pink-500">Instagram</Link>
            <Link href="https://x.com/gihomarts" target="_blank" className="hover:text-blue-400">X / Twitter</Link>
            <Link href="https://linkedin.com/yourpage" target="_blank" className="hover:text-blue-700">LinkedIn</Link>
          </div>
          <p className="text-sm">&copy; {year} GiHomarts & Cultours Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
