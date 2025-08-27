"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Clock, User, Tag, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()
  const [docs, setDocs] = useState([])

  useEffect(() => {
    fetch("/api/docs")
      .then(res => res.json())
      .then(setDocs)
  }, [])

  const articles = [
    {
      id: 1,
      title: "Traditional Rwandan Architecture: Building with Heritage",
      description:
        "Explore the unique architectural styles of traditional Rwandan homes, from the iconic thatched-roof houses to modern interpretations that preserve cultural elements. Learn about construction techniques, materials, and the cultural significance of different architectural features.",
      category: "Culture",
      author: "Kajuga jerome",
      readTime: "8 min read",
      publishDate: "2024-12-15",
      image: "/images/inzu.jpg?height=200&width=300",
      tags: ["Architecture", "Heritage", "Traditional", "Culture"],
      featured: true,
    },
    {
      id: 2,
      title: "The Art of Rwandan Basket Weaving: Agaseke Traditions",
      description:
        "Discover the intricate art of Agaseke basket weaving, a UNESCO-recognized cultural practice. This comprehensive guide covers the history, techniques, patterns, and cultural significance of these beautiful handwoven baskets that tell stories of Rwandan heritage.",
      category: "Crafts",
      author: "Kajuga jerome",
      readTime: "12 min read",
      publishDate: "2024-12-10",
      image: "/images/agaseke.jpg?height=200&width=300",
      tags: ["Crafts", "UNESCO", "Weaving", "Agaseke"],
      featured: true,
    },
    {
      id: 3,
      title: "Rwandan Coffee Culture: From Bean to Cup",
      description:
        "Journey through Rwanda's coffee culture, from the highland plantations to traditional brewing methods. Learn about the social aspects of coffee drinking, ceremonial preparations, and how coffee cultivation has shaped communities across the country.",
      category: "Food & Drink",
      author: "Kajuga jerome",
      readTime: "10 min read",
      publishDate: "2024-12-08",
      image: "/images/coffee.jpg?height=200&width=300",
      tags: ["Coffee", "Agriculture", "Culture", "Ceremony"],
      featured: false,
    },
    {
      id: 4,
      title: "Traditional Rwandan Music and Dance: Intore Warriors",
      description:
        "Delve into the powerful world of Intore dance, the traditional warrior dance of Rwanda. Understand the historical context, symbolic movements, traditional instruments, and how these performances preserve stories of courage and unity.",
      category: "Arts",
      author: "Kajuga jerome",
      readTime: "15 min read",
      publishDate: "2024-12-05",
      image: "/images/intore.jpg?height=200&width=300",
      tags: ["Dance", "Music", "Intore", "Warriors", "Performance"],
      featured: true,
    },
    {
      id: 5,
      title: "Sustainable Tourism Practices in Rural Rwanda",
      description:
        "Learn about innovative sustainable tourism practices being implemented in rural Rwandan communities. This guide covers eco-friendly accommodations, community-based tourism models, and how visitors can minimize their environmental impact.",
      category: "Tourism",
      author: "Kajuga jerome",
      readTime: "11 min read",
      publishDate: "2024-12-03",
      image: "/images/sustain.png?height=200&width=300",
      tags: ["Sustainability", "Eco-tourism", "Community", "Environment"],
      featured: false,
    },
    {
      id: 6,
      title: "The History of Rwandan Kingdoms: Nyiginya Dynasty",
      description:
        "Explore the rich history of the Nyiginya Dynasty and the Kingdom of Rwanda. This comprehensive historical overview covers royal traditions, governance systems, cultural practices, and the lasting impact on modern Rwandan society.",
      category: "History",
      author: "Kajuga jerome",
      readTime: "20 min read",
      publishDate: "2024-11-28",
      image: "/images/king.png?height=200&width=300",
      tags: ["History", "Kingdoms", "Nyiginya", "Royalty", "Governance"],
      featured: false,
    },
    {
      id: 7,
      title: "Traditional Rwandan Cuisine: Flavors of Heritage",
      description:
        "Discover the authentic flavors of traditional Rwandan cuisine. From ubugali and igikoma to ceremonial foods, learn about ingredients, cooking methods, and the cultural significance of sharing meals in Rwandan society.",
      category: "Food & Drink",
      author: "Kajuga jerome",
      readTime: "14 min read",
      publishDate: "2024-11-25",
      image: "/images/cousine.png?height=200&width=300",
      tags: ["Cuisine", "Food", "Traditional", "Cooking", "Culture"],
      featured: false,
    },
    {
      id: 8,
      title: "Rwandan Proverbs and Oral Traditions",
      description:
        "Explore the wisdom embedded in Rwandan proverbs and oral traditions. This collection includes popular sayings, their meanings, cultural context, and how these traditions continue to guide modern Rwandan life and values.",
      category: "Culture",
      author: "Kajuga jerome",
      readTime: "9 min read",
      publishDate: "2024-11-22",
      image: "/images/proverbs.png?height=200&width=300",
      tags: ["Proverbs", "Oral Tradition", "Wisdom", "Language", "Values"],
      featured: false,
    },
    {
      id: 9,
      title: "Community-Based Tourism: Empowering Local Communities",
      description:
        "Learn how community-based tourism initiatives are transforming rural communities in Rwanda. This guide covers successful case studies, best practices, and the social and economic benefits of involving local communities in tourism development.",
      category: "Tourism",
      author: "Kajuga jerome",
      readTime: "13 min read",
      publishDate: "2024-11-20",
      image: "/images/community.png?height=200&width=300",
      tags: ["Community Tourism", "Empowerment", "Development", "Local Communities"],
      featured: true,
    },
    {
      id: 10,
      title: "Traditional Healing Practices and Medicinal Plants",
      description:
        "Discover the traditional healing practices of Rwanda and the medicinal plants used by traditional healers. Learn about the cultural significance of these practices and their integration with modern healthcare approaches.",
      category: "Health",
      author: "Kajuga jerome",
      readTime: "16 min read",
      publishDate: "2024-11-18",
      image: "/images/medecine.png?height=200&width=300",
      tags: ["Traditional Medicine", "Healing", "Plants", "Healthcare", "Culture"],
      featured: false,
    },
  ]

  const categories = ["all", "Culture", "Crafts", "Food & Drink", "Arts", "Tourism", "History", "Health"]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = articles.filter((article) => article.featured)

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

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {searchTerm === "" && selectedCategory === "all" && (
        <section className="py-12 px-4 bg-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
              <p className="text-lg text-muted-foreground">Our most popular and comprehensive cultural documentation</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article) => (
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
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="relative h-48 md:h-full">
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
                        {article.featured && <Badge className="bg-orange-600">Featured</Badge>}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 hover:text-orange-600 transition-colors">
                        <Link href={`/documentation/${article.id}`}>{article.title}</Link>
                      </h3>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{article.description}</p>

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
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      {searchTerm === "" && selectedCategory === "all" && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
              <p className="text-lg text-muted-foreground">
                Browse our documentation by topic to find exactly what you're looking for
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => {
                const categoryCount = articles.filter((article) => article.category === category).length
                return (
                  <Card
                    key={category}
                    className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                      <CardDescription>
                        {categoryCount} article{categoryCount !== 1 ? "s" : ""}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Video */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Featured Video</h2>
            <p className="text-lg text-muted-foreground">
              Watch our latest video about Rwandan culture and heritage
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/yrqUF9O164U"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ background: "transparent" }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
