"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { MapPin, Star, Clock, Users } from "lucide-react"

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      region: "Europe",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.9,
      price: "$1,299",
      duration: "7 days",
      groupSize: "2-12 people",
      description: "Experience the stunning sunsets and white-washed buildings of this iconic Greek island.",
      highlights: ["Sunset Views", "Wine Tasting", "Historic Sites"],
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      region: "Asia",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.8,
      price: "$899",
      duration: "10 days",
      groupSize: "2-15 people",
      description: "Discover tropical paradise with beautiful beaches, temples, and rich culture.",
      highlights: ["Beach Resorts", "Temple Tours", "Cultural Experience"],
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      region: "Asia",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.7,
      price: "$1,599",
      duration: "8 days",
      groupSize: "2-10 people",
      description: "Immerse yourself in the perfect blend of traditional and modern Japanese culture.",
      highlights: ["City Tours", "Food Experience", "Cultural Sites"],
    },
    {
      id: 4,
      name: "Huye city tour",
      region: "South province",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.9,
      price: "$1,199",
      duration: "6 days",
      groupSize: "4-16 people",
      description: "Trek to the ancient Incan citadel and explore the mysteries of this UNESCO World Heritage site.",
      highlights: ["Hiking", "Ancient Ruins", "Mountain Views"],
    },
    {
      id: 5,
      name: "Huye Mountain",
      region: " Rwanda- Africa",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.8,
      price: "$200",
      duration: "12 days",
      groupSize: "2-8 people",
      description: "Witness the Great Migration and experience incredible wildlife in their natural habitat.",
      highlights: ["Wildlife Safari", "Migration", "Luxury Camps"],
    },
    {
      id: 6,
      name: "Iceland Ring Road",
      region: "Europe",
      image: "/placeholder.svg?height=250&width=350",
      rating: 4.6,
      price: "$1,799",
      duration: "9 days",
      groupSize: "2-12 people",
      description: "Drive the famous Ring Road and discover waterfalls, glaciers, and the Northern Lights.",
      highlights: ["Northern Lights", "Waterfalls", "Glaciers"],
    },
  ]

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || destination.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Amazing Destinations</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from our carefully curated selection of world-class travel destinations
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL SITE</SelectItem>
                <SelectItem value="HUYE">HUYE</SelectItem>
                <SelectItem value="SOVU">Asia</SelectItem>
                <SelectItem value="MARABA">Africa</SelectItem>
                <SelectItem value="RUHASHYA">South America</SelectItem>
                <SelectItem value="SIMBI">North America</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">{destination.region}</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {destination.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {destination.groupSize}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                      <Button asChild>
                        <Link href="/booking">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
