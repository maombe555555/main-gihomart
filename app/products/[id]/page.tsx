"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(async (res) => (res.ok ? res.json() : null))
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Navigation />
      <div className="max-w-5xl mx-auto">
        <Link href="/products" className="text-sm text-blue-600">← Back to products</Link>
        {loading && <div className="mt-6">Loading...</div>}
        {!loading && !product && <div className="mt-6">Product not found.</div>}
        {product && (
          <Card className="mt-6">
            <div className="relative h-80 w-full">
              {product.image && (
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">{product.description}</p>
              {product.price !== undefined && (
                <div className="text-xl font-bold text-orange-600 mb-6">${product.price}</div>
              )}
              <Button asChild>
                <Link href="/booking">Book this experience</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


