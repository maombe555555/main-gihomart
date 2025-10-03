"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Phone, Mail, Menu, X } from "lucide-react";

export default function BookingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [viewProduct, setViewProduct] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logooo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full border border-gray-300"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-2xl">GiHomArts &amp; Cultours Ltd</span>
              <span className="text-sm md:text-base text-gray-500">My Heritage Today &amp; Tomorrow</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/programs" className="text-gray-700 hover:text-blue-600">Programs</Link>
            <Link href="/booking" className="text-gray-700 hover:text-blue-600">Booking</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 flex flex-col px-4 py-3 space-y-3">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/programs" className="text-gray-700 hover:text-blue-600">Programs</Link>
            <Link href="/booking" className="text-gray-700 hover:text-blue-600">Booking</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24"></div>

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-12 md:py-16 px-4 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Plan Your Perfect Trip</h1>
          <p className="text-base md:text-xl text-blue-100">
            Tell us about your dream destination and we’ll create a personalized itinerary
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 py-8 md:py-12 px-4">
        {/* LEFT */}
        <section className="lg:col-span-2 space-y-10">
          <h2 className="text-xl md:text-2xl font-bold text-center">Available Services & Programs</h2>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((item) => (
              <div key={item._id || item.name} className="border rounded-xl p-4 bg-white shadow">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                {item.price && <p className="text-orange-600 font-semibold">${item.price}</p>}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" onClick={() => setViewProduct(item)}>View</Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedProducts((prev) => {
                        if (prev.some((p) => p.name === item.name)) return prev;
                        toast({ title: "Added", description: `${item.name} added to booking.` });
                        return [...prev, item];
                      });
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Book Your Adventure</CardTitle>
              <CardDescription>Fill out the form below</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comments">Special Requests</Label>
                  <Textarea id="comments" rows={3} />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 items-center">
                <Phone className="w-5 h-5 text-blue-600" />
                <p>+250 788 440 243</p>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-5 h-5 text-blue-600" />
                <p>gihomart@250gmail.com</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-2">{viewProduct.name}</h2>
            {viewProduct.image && (
              <Image
                src={viewProduct.image}
                alt={viewProduct.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <p className="mb-3 text-sm">{viewProduct.description}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setSelectedProducts((prev) => [...prev, viewProduct]);
                  setViewProduct(null);
                }}
              >
                Add
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setViewProduct(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
