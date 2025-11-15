'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Navigation() {
  const [showServices, setShowServices] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logooo.jpg"
          alt="GiHomarts Logo"
          width={40}
          height={40}
          className="rounded-full border border-orange-600"
        />
        <span className="font-bold text-xl text-orange-500">GiHomarts</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 relative">
        <Link href="/" className="hover:text-orange-400">Home</Link>
        <Link href="/about" className="hover:text-orange-400">About</Link>

        {/* Services dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <button className="hover:text-orange-400 flex items-center gap-1">
            Services ▼
          </button>

          {showServices && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg py-2 z-50">
              <Link href="/products" className="block px-4 py-2 hover:bg-orange-600">Products</Link>
              <Link href="/programs" className="block px-4 py-2 hover:bg-orange-600">Programs</Link>
            </div>
          )}
        </div>

        <Link href="/contact" className="hover:text-orange-400">Contact</Link>

        {/* Social icons (optional, if you want to repeat at top right) */}
      </div>
    </nav>
  )
}
