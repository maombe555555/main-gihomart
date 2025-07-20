'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { MapPin, Star, Play } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [programs, setPrograms] = useState([])
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
      name: " Cultural Experience",
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
      name: " Heritage Tour",
      image: "/images/IMG-20231126-WA0030.jpg?height=200&width=300",
      price: "$6500",
      duration: "6 days",
      location: "Huye City",
      rating: 4.7,
    },  {
      id: 6,
      name: " Heritage Tour",
      image: "/images/DSC_0027.JPG?height=200&width=300",
      price: "$6500",
      duration: "6 days",
      location: "Huye City",
      rating: 4.7,
    }, ]

  const travelArticles = [
    {
      id: 1,
      title: "Cycling Through Rwanda's Hills",
      image: "/images/huye tour.jpg?height=200&width=300",
      excerpt: "Discover the beauty of Rwanda's landscape on two wheels",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Traditional Rwandan Culture",
      image: "/images/inzo.jpg?height=200&width=300",
      excerpt: "Immerse yourself in authentic cultural experiences",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Community Tourism Impact",
      image: "/images/today.jpg?height=200&width=300",
      excerpt: "How tourism supports local communities in Rwanda",
      readTime: "6 min read",
    },
  ]

  const partners = [
    { name: "Rwanda Tourism Board", logo: "/placeholder.svg?height=60&width=120" },
    { name: "UNESCO", logo: "/placeholder.svg?height=60&width=120" },
    { name: "CNRU", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Travel Partners", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/back.jpg"
            alt="People celebrating in Rwanda landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to GiHomarts & Cultours Ltd</h1>
          <p className="text-lg md:text-xl mb-8 text-orange-300 leading-relaxed">
            Discover the beauty and culture of Rwanda with GiHomarts & Cultours Ltd, your premier destination for
            unforgettable travel experiences. As a community based tourism company located in the southern province of
            Rwanda, we are dedicated to showcasing the rich heritage and natural wonders of our beloved country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/destinations">Explore Our Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-grey text-blue hover:bg-white hover:text-gray-900"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services Section (Products from DB) */}
      {products.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Services</h2>
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                Discover our unique experiences and offerings curated for you.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {product.image && (
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    {product.price && (
                      <span className="text-lg font-bold text-orange-600">${product.price}</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Programs Section (Programs from DB) */}
      {programs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Programs</h2>
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                Explore our unique programs and opportunities.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program: any) => (
                <Card key={program._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">{program.description}</p>
                    {program.schedule && (
                      <span className="text-sm font-medium text-blue-600">{program.schedule}</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Trips Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Popular Trips</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            GiHomarts & Cultours Ltd curates authentic travel experiences in Rwanda that highlight its natural beauty, cultural heritage, and community spirit. 
            Experience Rwanda's most sought-after destinations with our carefully crafted tour packages 
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={trip.image || "/npm.jpg"} alt={trip.name} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-orange-600">{trip.duration}</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{trip.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{trip.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">{trip.price}</span>
                    <Button asChild>
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amazing Travel Articles */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Amazing Travel Articles</h2>
           
          </div> <p className="text-lg md:text-xl mb-8 text-black-300 leading-relaxed">
            Our vision is to revolutionize Rwandan commerce by providing a trusted digital marketplace that connects local vendors, artisans, 
            and farmers with a growing community of conscious consumers. We aspire to be a catalyst for inclusive economic growth—where even the smallest entrepreneur has a platform to thrive. Our goal is to empower underserved communities with technology-driven tools that amplify their voices, increase visibility, and foster sustainability. We envision a Rwanda where commerce is no longer limited by geography or infrastructure, but rather fueled by innovation, resilience, and community spirit. Through partnerships, mobile-first solutions, and user-centered design, we strive to build more than just a marketplace—we are building a movement where culture meets commerce, and tradition merges with technology to shape a brighter, more connected future for all.
            </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {travelArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={article.image || "/miss.jpg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Video */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/yrqUF9O164U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
            <div className="relative h-64">
              <Image
                src="/images/kawa.webp?height=250&width=400"
                alt="Group travel experience"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 px-0 bg-gray-50 w-full">
        <div className="max-w-full mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">Our Partners</h3>
          <p className="text-gray-400 mb-4  text-center">
                Preserving heritage for today and tomorrow through authentic cultural tourism experiences in Rwanda.
              </p>
          <div className="w-full flex flex-wrap justify-center items-center gap-12 md:gap-20 px-2 md:px-8">
            {[
              {
                img: "cnru.png",
                name: "CNRU",
                url: "https://www.cnru.rw/"
              },
              {
                img: "inteko-y-umuco.png",
                name: "Inteko y'Umuco",
                url: "https://www.intekoyumuco.rw/"
              },
              {
                img: "iprc-kitabi.png",
                name: "IPRC Kitabi",
                url: "https://www.iprckitabi.rp.ac.rw/"
              },
              {
                img: "university-of-rwanda.png",
                name: "University of Rwanda",
                url: "https://www.ur.ac.rw/"
              }
            ].map((partner, index) => (
              <Link key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center bg-white rounded shadow p-4 md:p-8" style={{minWidth:180, minHeight:90}}>
                <Image
                  src={`/images/${partner.img}`}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="object-contain max-w-full max-h-40 md:max-h-48 opacity-80 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
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

            {/* Our Services */}
            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/cultural-tours" className="hover:text-white">
                    Cultural Tours
                  </Link>
                </li>
                <li>
                  <Link href="/heritage-sites" className="hover:text-white">
                    Heritage Sites
                  </Link>
                </li>
                <li>
                  <Link href="/community-tourism" className="hover:text-white">
                    Community Tourism
                  </Link>
                </li>
                <li>
                  <Link href="/adventure-tours" className="hover:text-white">
                    Adventure Tours
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="hover:text-white">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="/program" className="hover:text-white">
                    Program
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Southern Province, Rwanda</p>
                <p>Email: gihomart@250gmail.com</p>
                <p>Phone: +250  788 440 243</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-start">
              <h4 className="font-semibold mb-4">Scan QR</h4>
              <Image
                src="/images/qrcode.png"
                alt="GiHomarts QR Code"
                width={80}
                height={80}
                className="rounded border border-gray-300 bg-white p-1"
              />
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GiHomarts. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
