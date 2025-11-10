"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search, BookOpen, Clock, User, Tag, Calendar
} from "lucide-react"

// --- TYPE DEFINITIONS ---
type Article = {
  id: string | number
  title: string
  description: string
  author: string
  category: string
  image?: string
  pdfUrl?: string
  videoUrl?: string
  tags: string[]
  featured?: boolean
  readTime: string
  publishDate: string
}

type RawArticle = {
  _id?: string | number
  createdAt?: string
  title: string
  content: string
  author: string
  category: string
  imageUrl?: string
  pdfUrl?: string
  videoUrl?: string
}

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [docs, setDocs] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    "all", "Culture", "Crafts", "Food & Drink", "Arts", "Tourism", "History", "Health"
  ]

  useEffect(() => {
    fetch("/api/documentation")
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch"))
      .then((data: RawArticle[]) => {
        const transformed: Article[] = data.map(doc => ({
          id: doc._id || Math.random().toString(36).substring(2, 9),
          title: doc.title,
          description: doc.content,
          author: doc.author,
          category: doc.category,
          image: doc.imageUrl,
          pdfUrl: doc.pdfUrl,
          videoUrl: doc.videoUrl,
          tags: [doc.category],
          featured: false,
          readTime: "3 min read",
          publishDate: doc.createdAt
            ? new Date(doc.createdAt).toISOString()
            : new Date().toISOString(),
        }))
        setDocs(transformed)
      })
      .catch(err => {
        console.error("Error loading docs:", err)
        setDocs([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const filteredArticles = docs.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = docs.filter(article => article.featured)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-orange-600">Loading documentation...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cultural Documentation</h1>
          <p className="text-xl text-orange-100">
            Comprehensive guides and articles about Rwandan culture, heritage, and tourism practices
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {searchTerm === "" && selectedCategory === "all" && featuredArticles.length > 0 && (
        <section className="py-12 px-4 bg-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
              <p className="text-lg text-muted-foreground">
                Our most popular and comprehensive cultural documentation
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map(article => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/documentation/${article.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {searchTerm || selectedCategory !== "all" ? "Search Results" : "All Articles"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredArticles.map(article => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="relative h-48">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-3 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        {article.featured && (
                          <Badge className="bg-orange-600">Featured</Badge>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 hover:text-orange-600 transition-colors">
                        <Link href={`/documentation/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/documentation/${article.id}`}>Read Full Article</Link>
                        </Button>
                      </div>

                      {/* Media Previews */}
                      {article.image && (
                        <img
                          src={article.image}
                          alt="Article image"
                          className="mt-6 rounded shadow-md max-w-full"
                        />
                      )}
                      {article.pdfUrl && (
                        <iframe
                          src={article.pdfUrl}
                          className="mt-6 w-full h-96 border rounded"
                          title="PDF Preview"
                        />
                      )}
                      {article.videoUrl && (
                        <video
                          src={article.videoUrl}
                          controls
                          className="mt-6 w-full rounded border"
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
    