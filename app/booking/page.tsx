"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Navigation } from "@/components/navigation"
import { CalendarIcon, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookingPage() {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [products, setProducts] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [viewProduct, setViewProduct] = useState<any | null>(null);

  // Core services (same as products page)
  const coreServices = [
    {
      name: "HIKING",
      description:
        "Embark on exhilarating hikes to explore the historical and awe-inspiring Huye Mountain. Our expert guides will lead you on unforgettable journeys through breathtaking landscapes and hidden treasures.",
      image: "/images/huye tour.jpg",
      price: 25,
    },
    {
      name: "CAMPING",
      description:
        "Spend a night under the stars atop Huye Mountain with our camping experiences. Relax in comfortable tents, surrounded by stunning vistas and the sounds of nature, and awaken to unforgettable sunrise views.",
      image: "/images/back.jpg",
      price: 30,
    },
    {
      name: "MOUNTAIN BIKING",
      description:
        "Embark on adrenaline-pumping mountain biking adventures through Huye mountains. Explore rugged trails, picturesque villages, and breathtaking viewpoints with our experienced guides.",
      image: "/images/intore.jpg",
      price: 25,
    },
    {
      name: "COFFEE EXPERIENCE",
      description:
        "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings.",
      image: "/images/kawa.webp",
      price: 25,
    },
    {
      name: "HUYE BRAIN CITY TOUR",
      description:
        "Experience the charm and history of Huye city on two wheels with our guided mountain bike tours. Pedal through ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character.",
      image: "/images/huye tour.jpg",
      price: 25,
    },
    {
      name: "RWANDAN CUISINE",
      description:
        "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods, and savor the flavors of our rich culinary heritage.",
      image: "/images/cousine.png",
      price: 25,
    },
  ];

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data)
        else setProducts([])
      })
      .catch(() => setProducts([]))
    fetch("/api/programs")
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPrograms(data)
        else setPrograms([])
      })
      .catch(() => setPrograms([]))
  }, [])

  // Filter out any DB products that duplicate the core services by name (case-insensitive)
  const filteredProducts = Array.isArray(products)
    ? products.filter((product: any) =>
        !coreServices.some(service => service.name.toLowerCase() === product.name?.toLowerCase())
      )
    : []

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const residence = (form.querySelector("[data-field='residence']") as HTMLElement | null)?.getAttribute("data-value") || ""
    const travelers = (form.querySelector("[data-field='travelers']") as HTMLElement | null)?.getAttribute("data-value") || ""
    const budget = (form.querySelector("[data-field='budget']") as HTMLElement | null)?.getAttribute("data-value") || ""
    const data = {
      firstName: (form.querySelector<HTMLInputElement>("#firstName")?.value || "").trim(),
      lastName: (form.querySelector<HTMLInputElement>("#lastName")?.value || "").trim(),
      email: (form.querySelector<HTMLInputElement>("#email")?.value || "").trim(),
      phone: (form.querySelector<HTMLInputElement>("#phone")?.value || "").trim(),
      residence,
      departureDate: departureDate ? departureDate.toISOString() : undefined,
      returnDate: returnDate ? returnDate.toISOString() : undefined,
      travelers: travelers ? Number(travelers) : undefined,
      budget,
      comments: (form.querySelector<HTMLTextAreaElement>("#comments")?.value || "").trim(),
      products: selectedProducts,
    }
    try {
      setSubmitting(true)
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to submit booking")
      form.reset()
      setDepartureDate(undefined)
      setReturnDate(undefined)
      alert("Booking request submitted! We'll contact you within 24 hours.")
    } catch (err) {
      alert("Failed to submit booking. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-xl text-blue-100">
            Tell us about your dream destination and we'll create a personalized itinerary for you
          </p>
        </div>
      </section>

      {/* Products & Programs Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Available Services & Programs</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Core Services and DB Products */}
            {[...coreServices, ...filteredProducts].map((item: any, idx) => (
              <div key={item._id || item.name} className="border rounded-lg p-4 bg-white shadow">
                <div className="flex items-center gap-4 mb-2">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  )}
                  <div>
                    <div className="font-bold text-lg">{item.name}</div>
                    {item.price && (
                      <div className="text-orange-600 font-semibold">${item.price}</div>
                    )}
                  </div>
                </div>
                <div className="text-gray-700 mb-1">{item.description}</div>
                {item.price && (
                  <div className="text-sm text-blue-700 font-medium">To pay, use MoMo +250 788 440 243</div>
                )}
                <div className="flex gap-2 mt-2">
                  <Button variant="secondary" onClick={() => setViewProduct(item)}>
                    View Details
                  </Button>
                  <Button variant="default" onClick={() => setSelectedProducts(prev => prev.some(p => p.name === item.name) ? prev : [...prev, item])}>
                    Add to Booking
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Programs */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((program: any) => (
                <div key={program._id} className="border rounded-lg p-4 bg-white shadow">
                  <div className="font-bold text-lg mb-1">{program.name}</div>
                  <div className="text-gray-700 mb-1">{program.description}</div>
                  {program.schedule && (
                    <div className="text-sm text-blue-700 font-medium">Schedule: {program.schedule}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book Your Adventure</CardTitle>
            <CardDescription>
              Fill out the form below and our travel experts will get back to you with a customized quote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
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
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Trip Details</h3>
                <div>
                  <Label htmlFor="residence">Customer Residence</Label>
                  <Select>
                    <SelectTrigger data-field="residence" data-value="">
                      <SelectValue placeholder="Select residence region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rwanda" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "rwanda")}>Rwanda</SelectItem>
                      <SelectItem value="east-africa" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "east-africa")}>East Africa</SelectItem>
                      <SelectItem value="africa" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "africa")}>Rest of Africa</SelectItem>
                      <SelectItem value="europe" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "europe")}>Europe</SelectItem>
                      <SelectItem value="asia" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "asia")}>Asia</SelectItem>
                      <SelectItem value="americas" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "americas")}>Americas</SelectItem>
                      <SelectItem value="oceania" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "oceania")}>Oceania</SelectItem>
                      <SelectItem value="other" onClick={(e) => (e.currentTarget.parentElement?.previousElementSibling as HTMLElement | null)?.setAttribute("data-value", "other")}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Selected Products */}
                {selectedProducts.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Selected Products</h4>
                    <ul className="list-disc pl-5">
                      {selectedProducts.map((prod, i) => (
                        <li key={prod._id || prod.name} className="mb-1 flex justify-between items-center">
                          <span>{prod.name} {prod.price ? `($${prod.price})` : ''}</span>
                          <Button size="sm" variant="destructive" onClick={() => setSelectedProducts(selectedProducts.filter(p => p.name !== prod.name))}>Remove</Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Booking cost 20$ ON 0788 440 243</h3>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div>
                  <Label htmlFor="comments">Special Requests or Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Tell us about any special requirements, interests, or questions you have..."
                    rows={4}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Our travel experts are here to assist you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-muted-foreground">+250788 440 243</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-sm text-muted-foreground">gihomart@250gmail.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose WanderLust?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <p className="text-sm">Expert local guides and personalized itineraries</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <p className="text-sm">24/7 customer support during your trip</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <p className="text-sm">Best price guarantee and flexible cancellation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <p className="text-sm">Sustainable and responsible travel practices</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-2">{viewProduct.name}</h2>
            {viewProduct.image && <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-40 object-cover rounded mb-2" />}
            <div className="mb-2">{viewProduct.description}</div>
            {viewProduct.price && <div className="text-orange-600 font-semibold mb-2">${viewProduct.price}</div>}
            <Button variant="default" className="mr-2" onClick={() => setSelectedProducts(prev => prev.some(p => p.name === viewProduct.name) ? prev : [...prev, viewProduct])}>Add to Booking</Button>
            <Button variant="secondary" onClick={() => setViewProduct(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
