"use client";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const userEmail = "maseemmy200@gmail.com"; // replace with dynamic auth later

  return (
    <nav className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Company */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">GiHomArts & Cultours Ltd</span>
              <span className="text-sm text-gray-500">
                My Heritage Today & Tomorrow
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="/products" className="text-gray-700 hover:text-indigo-600">
              Products
            </a>
            <a href="/programs" className="text-gray-700 hover:text-indigo-600">
              Programs
            </a>
            <a href="/booking" className="text-gray-700 hover:text-indigo-600">
              Booking
            </a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
            <span className="text-sm text-gray-600">
              Welcome, <b>{userEmail}</b>
            </span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm p-4 space-y-3">
          <a href="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </a>
          <a href="/products" className="block text-gray-700 hover:text-indigo-600">
            Products
          </a>
          <a href="/programs" className="block text-gray-700 hover:text-indigo-600">
            Programs
          </a>
          <a href="/booking" className="block text-gray-700 hover:text-indigo-600">
            Booking
          </a>
          <a href="/contact" className="block text-gray-700 hover:text-indigo-600">
            Contact
          </a>
          <span className="block text-sm text-gray-600">
            Welcome, <b>{userEmail}</b>
          </span>
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-1"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
