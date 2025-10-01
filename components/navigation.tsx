"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logooo.jpg"
              alt="GiHomarts Logo"
              width={48}
              height={48}
              className="rounded-full object-contain bg-white"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">GiHomArts & Cultours Ltd</span>
              <span className="text-xs text-muted-foreground leading-tight">My Heritage Today & Tomorrow</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              About us
            </Link>
            <Link href="/documentation" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Documentation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Contact us
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Our service
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/products">Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programs">Programs</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/documentation"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
              <div className="pl-4 space-y-2">
                <p className="font-medium text-gray-900">Our Services:</p>
                <Link
                  href="/products"
                  className="block text-gray-600 hover:text-orange-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/programs"
                  className="block text-gray-600 hover:text-orange-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Programs
                </Link>
              </div>
              <Button asChild className="w-fit bg-orange-600 hover:bg-orange-700">
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
