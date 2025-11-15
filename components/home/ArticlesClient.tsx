// app/components/ArticlesClient.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Article = {
  id: number
  title: string
  image: string
  excerpt: string
  fullText: string
  readTime: string
}

const travelArticles: Article[] = [
  {
    id: 1,
    title: "Cycling Through Huye's Hills",
    image: "/images/hq720.jpg",
    excerpt: "Discover the beauty of Rwanda's landscape on two wheels",
    fullText: `Huye, Rwanda’s cultural and academic capital, offers more than intellectual depth...`,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Traditional Rwandan Culture",
    image: "/images/inzo.jpg",
    excerpt: "Discover the ritual and meaning behind ikigage, Rwanda's traditional sorghum brew.",
    fullText: `In the heart of Rwanda’s cultural heritage lies ikigage...`,
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Community Tourism Impact",
    image: "/images/today.jpg",
    excerpt: "How tourism supports local communities in Rwanda",
    fullText: `Nestled in the southern province of Rwanda, Huye formerly known as Butare...`,
    readTime: "6 min read",
  },
]

export default function ArticlesClient() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Amazing Travel Articles</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {travelArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-orange-700">{article.title}</CardTitle>
                <CardDescription className="text-gray-600">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50" onClick={() => setSelectedArticle(article)}>
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative border border-orange-200" onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-2xl font-bold" aria-label="Close" onClick={() => setSelectedArticle(null)}>×</button>
              <h3 className="text-3xl font-bold mb-6 text-orange-700 text-center">{selectedArticle.title}</h3>
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-base md:text-lg">{selectedArticle.fullText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
