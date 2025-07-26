'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  description: string
  price?: number
  image?: string
}

interface ServicesSectionProps {
  products: Product[]
}

export function ServicesSection({ products }: ServicesSectionProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Discover our unique experiences and offerings curated for you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{product.description}</p>
                {product.price && (
                  <span className="text-lg font-bold text-orange-600">
                    ${product.price}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 