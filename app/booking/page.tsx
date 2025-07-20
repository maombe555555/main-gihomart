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
  const [products, setProducts] = useState([])
  const [programs, setPrograms] = useState([])

  // Core services (same as products page)
  const coreServices = [
    {
      name: "HIKING",
      description:
        "Embark on exhilarating hikes to explore the historical and awe-inspiring Huye Mountain. Our expert guides will lead you on unforgettable journeys through breathtaking landscapes and hidden treasures.",
      image: "/images/huye tour.jpg",
      price: 15000,
    },
    {
      name: "CAMPING",
      description:
        "Spend a night under the stars atop Huye Mountain with our camping experiences. Relax in comfortable tents, surrounded by stunning vistas and the sounds of nature, and awaken to unforgettable sunrise views.",
      image: "/images/back.jpg",
      price: 20000,
    },
    {
      name: "MOUNTAIN BIKING",
      description:
        "Embark on adrenaline-pumping mountain biking adventures through Huye mountains. Explore rugged trails, picturesque villages, and breathtaking viewpoints with our experienced guides.",
      image: "/images/intore.jpg",
      price: 18000,
    },
    {
      name: "COFFEE EXPERIENCE",
      description:
        "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings.",
      image: "/images/kawa.webp",
      price: 12000,
    },
    {
      name: "HUYE BRAIN CITY TOUR",
      description:
        "Experience the charm and history of Huye city on two wheels with our guided mountain bike tours. Pedal through ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character.",
      image: "/images/huye tour.jpg",
      price: 10000,
    },
    {
      name: "RWANDAN CUISINE",
      description:
        "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods, and savor the flavors of our rich culinary heritage.",
      image: "/images/cousine.png",
      price: 14000,
    },
  ];

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([]))
    fetch("/api/programs")
      .then(res => res.json())
      .then(setPrograms)
      .catch(() => setPrograms([]))
  }, [])

  // Filter out any DB products that duplicate the core services by name (case-insensitive)
  const filteredProducts = products.filter(
    (product: any) => !coreServices.some(service => service.name.toLowerCase() === product.name?.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Booking request submitted! We'll contact you within 24 hours.")
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
                      <div className="text-orange-600 font-semibold">{item.price} RWF</div>
                    )}
                  </div>
                </div>
                <div className="text-gray-700 mb-1">{item.description}</div>
                {item.price && (
                  <div className="text-sm text-blue-700 font-medium">To pay, use MoMo +250 788 440 243</div>
                )}
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
                  <Label htmlFor="destination">Preferred Destination</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="santorini">Santorini, Greece</SelectItem>
                      <SelectItem value="bali">Bali, Indonesia</SelectItem>
                      <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                      <SelectItem value="machu-picchu">Machu Picchu, Peru</SelectItem>
                      <SelectItem value="kenya">Safari Kenya</SelectItem>
                      <SelectItem value="iceland">Iceland Ring Road</SelectItem>
                      <SelectItem value="other">Other (specify in comments)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !departureDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? departureDate.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? returnDate.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Under $500</SelectItem>
                        <SelectItem value="mid">$500- $1000</SelectItem>
                        <SelectItem value="luxury">$1000 - $1,500</SelectItem>
                        <SelectItem value="premium">$2000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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

              <Button type="submit" className="w-full" size="lg">
                Submit Booking Request
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
    </div>
  )
}
