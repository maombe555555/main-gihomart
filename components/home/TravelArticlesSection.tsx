'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export function TravelArticlesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Travel Articles
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Read about our experiences and insights into Rwandan culture and tourism.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{article.readTime}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.id}`}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 