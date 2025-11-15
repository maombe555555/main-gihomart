// app/components/ProductsClient.tsx
"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export default function ProductsClient() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const load = async () => {
      if (!API_BASE) {
        console.error("Missing NEXT_PUBLIC_API_URL")
        setProducts([])
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`${API_BASE}/products`)
        if (!res.ok) throw new Error("Products fetch failed")
        const json = await res.json()
        if (!ignore) setProducts(Array.isArray(json) ? json : [])
      } catch (err) {
        console.error("Products error:", err)
        if (!ignore) setProducts([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  if (loading) return <section className="py-16 px-4"><div className="max-w-7xl mx-auto">Loading services...</div></section>

  if (products.length === 0) return null

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product._id ?? product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {product.image && <Image src={product.image} alt={product.name} fill className="object-cover" />}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{product.description}</p>
                {product.price && <span className="text-lg font-bold text-orange-600">${product.price}</span>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
