"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { useToast } from "../../components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Phone, Mail } from "lucide-react"

export default function BookingPage() {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [products, setProducts] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [viewProduct, setViewProduct] = useState<any | null>(null)
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const coreServices = [
    {
      name: "HIKING",
      description:
        "Embark on exhilarating hikes to explore the historical and awe-inspiring Huye Mountain. Our expert guides will lead you on unforgettable journeys through breathtaking landscapes and hidden treasures.",
      image: "/images/hiking.png",
      price: 25,
    },
    {
      name: "CAMPING",
      description:
        "Spend a night under the stars atop Huye Mountain with our camping experiences. Relax in comfortable tents, surrounded by stunning vistas and the sounds of nature, and awaken to unforgettable sunrise views.",
      image: "/images/camping.png",
      price: 30,
    },
    {
      name: "MOUNTAIN BIKING",
      description:
        "Embark on adrenaline-pumping mountain biking adventures through Huye mountains. Explore rugged trails, picturesque villages, and breathtaking viewpoints with our experienced guides.",
      image: "/images/mb.jpg",
      price: 25,
    },
    {
      name: "COFFEE EXPERIENCE",
      description:
        "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings.",
      image: "/images/coffee.jpg",
      price: 25,
    },
    {
      name: "HUYE BRAIN CITY TOUR",
      description:
        "Experience the charm and history of Huye city on two wheels with our guided mountain bike tours. Pedal through ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character.",
      image: "/images/maxresdefault.jpg",
      price: 25,
    },
    {
      name: "RWANDAN CUISINE",
      description:
        "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods, and savor the flavors of our rich culinary heritage.",
      image: "/images/rwandan cuisine.png",
      price: 25,
    },
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selected = JSON.parse(localStorage.getItem("selectedPrograms") || "[]")
      if (selected.length > 0) {
        setSelectedProducts(selected)
        localStorage.removeItem("selectedPrograms")
      } else {
        const params = new URLSearchParams(window.location.search)
        const programName = params.get("program")
        if (programName) {
          const allPrograms = [...programs, ...coreServices]
          const found = allPrograms.find(p => p.name === programName)
          if (found && !selectedProducts.some(p => p.name === found.name)) {
            setSelectedProducts(prev => [...prev, found])
          }
        }
      }
    }
  }, [programs])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data)
        else setProducts([])
      })
      .catch(() => setProducts([]))
    fetch("/api/programs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPrograms(data)
        else setPrograms([])
      })
      .catch(() => setPrograms([]))
  }, [])

  const filteredProducts = Array.isArray(products)
    ? products.filter((product: any) =>
        !coreServices.some(service => service.name.toLowerCase() === product.name?.toLowerCase())
      )
    : []

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const residence =
      (form.querySelector("[data-field='residence']") as HTMLElement | null)?.getAttribute("data-value") || ""
    const travelers =
      (form.querySelector("[data-field='travelers']") as HTMLElement | null)?.getAttribute("data-value") || ""
    const budget =
      (form.querySelector("[data-field='budget']") as HTMLElement | null)?.getAttribute("data-value") || ""
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Navigation */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <img
              src="/images/logooo.jpg"
              alt="GiHomArts & Cultours Ltd Logo"
              className="h-12 w-12 rounded-full border border-gray-300"
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-black leading-tight">GiHomArts &amp; Cultours Ltd</span>
              <span className="text-base text-gray-500 font-normal -mt-1">My Heritage Today &amp; Tomorrow</span>
            </div>
          </div>
          <nav className="flex gap-4 sm:gap-6 items-center flex-wrap mt-2 sm:mt-0">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</a>
            <a href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition">Programs</a>
            <a href="/booking" className="text-gray-700 hover:text-blue-600 font-medium transition">Booking</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</a>
          </nav>
        </div>
      </header>

      <div className="h-24" /> {/* Spacer for fixed header */}

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 md:px-6 lg:px-8 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-xl text-blue-100">Tell us about your dream destination and we'll create a personalized itinerary for you</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4 md:px-6 lg:px-8">
        {/* Products & Programs */}
        <section className="lg:col-span-2 space-y-12">
          {/* Services */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Available Services & Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...coreServices, ...filteredProducts].map((item: any) => (
                <div
                  key={item._id || item.name}
                  className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
                >
                  {/* Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 md:h-72 object-cover rounded-xl border border-gray-200 shadow-md"
                    />
                  )}

                  {/* Name & Price */}
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-lg">{item.name}</div>
                    {item.price && <div className="text-orange-600 font-semibold">${item.price}</div>}
                  </div>

                  {/* Description */}
                  <div className="text-gray-700">{item.description}</div>

                  {/* Payment Info */}
                  {item.price && (
                    <div className="text-sm text-blue-700 font-medium">To pay, use MoMo +250 788 440 243</div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="secondary" onClick={() => setViewProduct(item)}>View Details</Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setSelectedProducts(prev => {
                          if (prev.some(p => p.name === item.name)) return prev
                          toast({ title: "Added to Booking", description: `${item.name} has been added to your booking.` })
                          return [...prev, item]
                        })
                      }}
                    >
                      Add to Booking
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {programs.map((program: any) => (
                <div key={program._id} className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-all duration-200 flex flex-col gap-4">
                  {program.image && (
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-64 md:h-72 object-cover rounded-xl border border-gray-200 shadow-md"
                    />
                  )}
                  <div className="font-bold text-lg">{program.name}</div>
                  <div className="text-gray-700">{program.description}</div>
                  {program.schedule && <div className="text-sm text-blue-700 font-medium">Schedule: {program.schedule}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          {/* ...same as previous organized form... */}
        </section>

        {/* Sidebar */}
        {/* ...same as previous organized sidebar... */}
      </main>

      {/* Product Modal */}
      {/* ...same as previous modal... */}
    </div>
  )
}
