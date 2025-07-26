'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

const popularTrips = [
  {
    id: 1,
    name: "Sailing Trip",
    image: "/images/nmp.jpg?height=200&width=300",
    price: "$7500",
    duration: "7 days",
    location: "Huye Mountain",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Cultural Experience",
    image: "/images/image1.jpg?height=200&width=300",
    price: "$4500",
    duration: "5 days",
    location: "Southern Province",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Heritage Tour",
    image: "/images/RWANDA GOATS.jpg?height=200&width=300",
    price: "$6500",
    duration: "6 days",
    location: "Huye City",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Cultural Experience",
    image: "/images/miss.jpg?height=200&width=300",
    price: "$4500",
    duration: "5 days",
    location: "Southern Province",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Heritage Tour",
    image: "/images/IMG-20231126-WA0030.jpg?height=200&width=300",
    price: "$6500",
    duration: "6 days",
    location: "Huye City",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Heritage Tour",
    image: "/images/DSC_0027.JPG?height=200&width=300",
    price: "$6500",
    duration: "6 days",
    location: "Huye City",
    rating: 4.7,
  },
]

export function PopularTripsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Popular Trips
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Experience the best of Rwanda with our most popular tours and experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={trip.image}
                  alt={trip.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-orange-600">
                  {trip.duration}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{trip.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {trip.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    {trip.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{trip.rating}</span>
                  </div>
                </div>
                <Link
                  href={`/destinations/${trip.id}`}
                  className="block w-full text-center bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 