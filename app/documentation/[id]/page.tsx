import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react"

// This would typically come from a database or CMS
const getArticle = (id: string) => {
  const articles = [
    {
      id: 1,
      title: "Traditional Rwandan Architecture: Building with Heritage",
      description:
        "Explore the unique architectural styles of traditional Rwandan homes, from the iconic thatched-roof houses to modern interpretations that preserve cultural elements.",
      category: "Culture",
      author: "Jean Baptiste Uwimana",
      readTime: "8 min read",
      publishDate: "2024-12-15",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["Architecture", "Heritage", "Traditional", "Culture"],
      content: `
        <h2>Introduction to Rwandan Architecture</h2>
        <p>Traditional Rwandan architecture represents a harmonious blend of functionality, cultural significance, and environmental adaptation. The iconic thatched-roof houses, known locally as "inyubako," have been the cornerstone of Rwandan residential design for centuries.</p>
        
        <h2>Historical Context</h2>
        <p>The evolution of Rwandan architecture reflects the country's rich history and cultural values. Traditional homes were designed not just as shelters, but as spaces that fostered community interaction and preserved cultural practices.</p>
        
        <h2>Key Architectural Elements</h2>
        <h3>The Thatched Roof</h3>
        <p>The distinctive conical thatched roof is perhaps the most recognizable feature of traditional Rwandan architecture. Made from locally sourced grass and reeds, these roofs provide excellent insulation and weather protection.</p>
        
        <h3>Construction Materials</h3>
        <p>Traditional Rwandan homes utilize locally available materials including:</p>
        <ul>
          <li>Clay and mud for walls</li>
          <li>Grass and reeds for roofing</li>
          <li>Wood for structural support</li>
          <li>Stone for foundations</li>
        </ul>
        
        <h2>Cultural Significance</h2>
        <p>Beyond their practical function, traditional Rwandan homes serve as important cultural spaces. The central hearth area, known as "icyicaro," is where families gather for meals and storytelling, preserving oral traditions and strengthening family bonds.</p>
        
        <h2>Modern Adaptations</h2>
        <p>Contemporary Rwandan architecture continues to draw inspiration from traditional designs while incorporating modern amenities and construction techniques. This approach ensures that cultural heritage remains relevant in today's context.</p>
        
        <h2>Preservation Efforts</h2>
        <p>Various initiatives are underway to preserve traditional architectural knowledge and techniques. These efforts include documentation projects, training programs for traditional builders, and the integration of traditional elements in modern construction.</p>
      `,
    },
    // Add more articles as needed
  ]

  return articles.find((article) => article.id === Number.parseInt(id))
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(params.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/documentation">Back to Documentation</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Article Header */}
      <section className="py-8 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/documentation">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Link>
          </Button>

          <div className="mb-6">
            <Badge className="mb-4 bg-orange-600">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="relative h-64 md:h-96 mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{article.author}</p>
                      <p className="text-sm text-muted-foreground">Cultural Expert</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Specialist in Rwandan cultural heritage and traditional practices with over 10 years of research
                    experience.
                  </p>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Link href="/documentation/2" className="text-sm font-medium hover:text-orange-600">
                      The Art of Rwandan Basket Weaving
                    </Link>
                    <p className="text-xs text-muted-foreground">Traditional crafts and techniques</p>
                  </div>
                  <div>
                    <Link href="/documentation/4" className="text-sm font-medium hover:text-orange-600">
                      Traditional Rwandan Music and Dance
                    </Link>
                    <p className="text-xs text-muted-foreground">Cultural performances and heritage</p>
                  </div>
                  <div>
                    <Link href="/documentation/8" className="text-sm font-medium hover:text-orange-600">
                      Rwandan Proverbs and Oral Traditions
                    </Link>
                    <p className="text-xs text-muted-foreground">Wisdom and cultural values</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Experience This Culture Firsthand</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join us on a cultural tour to experience the traditions and heritage described in this article.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/booking">Book a Cultural Tour</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Our Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
