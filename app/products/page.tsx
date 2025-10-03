"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Description } from "@radix-ui/react-toast"
import { imageOptimizer } from "next/dist/server/image-optimizer"

export default function ProductsPage() {
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
      image: "/images/biking.png",
      price: 25,
    },
    {
      name: "COFFEE EXPERIENCE",
      description:
        "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings.",
      image: "/images/experience.png",
      price: 25,
    },
    {
      name: "HUYE BRAIN CITY TOUR",
      description:
        "Experience the charm and history of Huye city on two wheels with our guided mountain bike tours. Pedal through ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character.",
      image: "/images/city tour.png",
      price: 25,
    },
    {
      name: "RWANDAN CUISINE EXPERIENCE",
      description:
        "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods, and savor the flavors of our rich culinary heritage.",
      image: "/images/rwandan cuisine.png",
      price: 25,
    },
    {
    name: "RICE PLANTATION TOUR",
    description: "Visit local rice fields and learn about the traditional and modern rice cultivation and harvesting techniques. Engage with farmers and gain insights into Rwanda’s agricultural heritage.",
    image: "/images/rice.png",
    price :25,
    },
    {
    name :"HAND CRAFTS MAKING",
    description: "Visit our reception area (Bungwe Queen’s Park) to browse a curated selection of handcrafted souvenirs, showcasing the talents of local artisans and providing meaningful mementos of your Rwandan adventure.",
    image: "/images/handcraft.png",
    price :20,
    
    },
    {
      name:"IGISORO GAME",
      description :"Igisoro is featured as part of immersive cultural experiences, allowing visitors to engage with Rwanda’s living traditions. Whether you're learning the rules or mastering the strategy, playing Igisoro connects you to generations of Rwandan storytelling and social interaction",
      image: "/images/research.png",
      price :10,
    }
  ];

  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data) ? data : []
      })
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  // Filter out any DB products that duplicate the core services by name (case-insensitive)
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product: any) =>
          !coreServices.some(
            (service) => service.name.toLowerCase() === product.name?.toLowerCase()
          )
      )
    : []

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Services & Experiences</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render core services first */}
          {coreServices.map((service, idx) => (
            <Card key={service.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {service.image ? (
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{service.description}</p>
                {service.price && (
                  <div className="mb-2">
                    <span className="text-lg font-bold text-orange-600">${service.price}</span>
                  </div>
                )}
                <div className="text-sm text-blue-700 font-medium">To pay, use MoMo +250 788 440 243</div>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {/* Render additional products from DB */}
          {filteredProducts.map((product: any) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{product.description}</p>
                {product.price && (
                  <div className="mb-2">
                    <span className="text-lg font-bold text-orange-600">${product.price}</span>
                  </div>
                )}
                <div className="text-sm text-blue-700 font-medium">To pay, use MoMo +250 788 440 243</div>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href={`/products/${product._id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* If no products and no core services (should never happen), show fallback */}
        {/* Removed 'No services found.' message */}
      </div>
    </div>
  )
} 