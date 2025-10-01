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
        "Explore the unique architectural styles of traditional Rwandan homes, from the iconic thatched-roof houses to modern interpretations that preserve cultural elements. Learn about construction techniques, materials, and the cultural significance of different architectural features.",
      category: "Culture",
      author: "Kajuga jerome",
      readTime: "8 min read",
      publishDate: "2024-12-15",
      image: "/images/inzu.jpg?height=200&width=300",
      tags: ["Architecture", "Heritage", "Traditional", "Culture"],
        content: `<h2>Introduction to Rwandan Architecture</h2><p>Traditional Rwandan architecture represents a harmonious blend of functionality, cultural significance, and environmental adaptation. The iconic thatched-roof houses, known locally as 'inyubako,' have been the cornerstone of Rwandan residential design for centuries.</p><h2>Historical Context</h2><p>The evolution of Rwandan architecture reflects the country's rich history and cultural values. Traditional homes were designed not just as shelters, but as spaces that fostered community interaction and preserved cultural practices. The royal palaces, such as the King's Palace in Nyanza, showcase the grandeur and complexity of ancient Rwandan design, with circular layouts and symbolic spatial arrangements.</p><h2>Key Architectural Elements</h2><h3>The Thatched Roof</h3><p>The distinctive conical thatched roof is perhaps the most recognizable feature of traditional Rwandan architecture. Made from locally sourced grass and reeds, these roofs provide excellent insulation and weather protection. The process of thatching is a communal activity, often involving neighbors and family members.</p><h3>Construction Materials</h3><ul><li>Clay and mud for walls, providing natural cooling</li><li>Grass and reeds for roofing, harvested seasonally</li><li>Wood for structural support, often from indigenous trees</li><li>Stone for foundations, ensuring durability</li></ul><h2>Spatial Organization</h2><p>Traditional homes are typically arranged in compounds, with separate structures for cooking, sleeping, and socializing. The central courtyard serves as a gathering place for ceremonies and daily activities.</p><h2>Cultural Significance</h2><p>Beyond their practical function, traditional Rwandan homes serve as important cultural spaces. The central hearth area, known as 'icyicaro,' is where families gather for meals and storytelling, preserving oral traditions and strengthening family bonds. Architectural features often reflect social status and family lineage.</p><h2>Modern Adaptations</h2><p>Contemporary Rwandan architecture continues to draw inspiration from traditional designs while incorporating modern amenities and construction techniques. Urban developments in Kigali and other cities blend traditional aesthetics with sustainable building practices, such as rainwater harvesting and solar energy.</p><h2>Preservation Efforts</h2><p>Various initiatives are underway to preserve traditional architectural knowledge and techniques. These efforts include documentation projects, training programs for traditional builders, and the integration of traditional elements in modern construction. Museums and cultural centers, like the Rwanda Art Museum, feature exhibits on architectural heritage and promote public awareness.</p><h2>Visiting Rwanda's Architectural Sites</h2><p>Travelers can explore reconstructed traditional homes, royal palaces, and community compounds to experience Rwanda's architectural legacy firsthand. Guided tours offer insights into building techniques, cultural symbolism, and the role of architecture in daily life.</p>`
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
        content: `<h2>Agaseke Basket Weaving: Rwanda's Living Tradition</h2><p>Agaseke baskets are a symbol of peace, love, and Rwandan identity. These handwoven treasures are crafted by skilled women using natural fibers and traditional techniques.</p><h2>Historical Significance</h2><p>Agaseke weaving dates back centuries, serving as a means of communication, gift-giving, and economic empowerment. The baskets are often exchanged during important ceremonies and symbolize unity and prosperity.</p><h2>Weaving Techniques</h2><ul><li>Selection of natural sisal and sweetgrass</li><li>Coloring with organic dyes</li><li>Intricate pattern creation representing cultural stories</li></ul><h2>Patterns and Symbolism</h2><p>Each basket design carries meaning, from peace and harmony to fertility and protection. The spiral motif is especially iconic, representing continuity and resilience.</p><h2>Modern Impact</h2><p>Agaseke baskets are now recognized globally, supporting women's cooperatives and promoting Rwandan culture through fair trade initiatives.</p>`
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
        content: `<h2>Rwandan Coffee Culture: From Highlands to Cup</h2><p>Rwanda's volcanic soil and high altitude produce exceptional coffee beans, celebrated for their rich flavor and aroma.</p><h2>Growing and Harvesting</h2><ul><li>Smallholder farmers cultivate coffee on terraced hillsides</li><li>Hand-picking ripe cherries ensures quality</li><li>Sun-drying and careful processing preserve flavor</li></ul><h2>Traditional Brewing</h2><p>Coffee ceremonies are a cherished tradition, bringing families and communities together. Brewing methods include clay pots and slow roasting over open fires.</p><h2>Social and Economic Impact</h2><p>Coffee is a vital export, supporting rural livelihoods and empowering women through cooperative farming.</p>`
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
      image: "/images/imag.jpg?height=200&width=300",
      tags: ["Dance", "Music", "Intore", "Warriors", "Performance"],
  content: `<h2>Intore Warriors: Rwanda's Dance of Valor</h2><p>Intore is a traditional dance performed by Rwandan warriors, symbolizing bravery, discipline, and unity. Dancers wear elaborate costumes, including beaded headdresses and flowing skirts, and perform with spears and shields.</p><h2>Origins and History</h2><p>Intore originated in royal courts and was used to train and celebrate warriors. The dance is accompanied by drums (ingoma), flutes, and chants that recount historical battles and victories.</p><h2>Symbolic Movements</h2><ul><li>High leaps represent courage and readiness for battle</li><li>Graceful arm gestures symbolize peace and respect</li><li>Group formations express unity and coordination</li></ul><h2>Role in Society</h2><p>Intore dancers are highly respected and often participate in national ceremonies, weddings, and cultural festivals. The dance serves as a living link to Rwanda's history and values.</p><h2>Modern Preservation</h2><p>Intore is performed at national events, weddings, and festivals, keeping Rwanda's warrior spirit alive. Dance troupes train young performers, ensuring the tradition continues for future generations.</p><h2>Experience Intore</h2><p>Visitors can watch Intore performances at cultural centers and festivals, and even join workshops to learn basic dance steps.</p>`
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
  content: `<h2>Sustainable Tourism: Protecting Rwanda's Natural Beauty</h2><p>Rwanda is a leader in eco-tourism, with initiatives that protect wildlife, conserve resources, and empower local communities. Key destinations include Volcanoes National Park, Akagera National Park, and Lake Kivu.</p><h2>Eco-Friendly Practices</h2><ul><li>Solar energy and rainwater harvesting in lodges</li><li>Waste reduction and recycling programs</li><li>Wildlife conservation partnerships with local communities</li></ul><h2>Community-Based Models</h2><p>Tourism revenue supports education, healthcare, and infrastructure, ensuring benefits reach local residents. Community guides and homestays offer authentic experiences and direct economic benefits.</p><h2>Visitor Tips</h2><p>Travelers are encouraged to respect local customs, minimize waste, and support community-run businesses. Participating in conservation activities, such as tree planting, is highly encouraged.</p><h2>Planning Your Visit</h2><p>Eco-lodges and community tours can be booked online or through local travel agencies. Responsible travel helps preserve Rwanda's natural and cultural heritage.</p>`
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
  content: `<h2>Nyiginya Dynasty: Rwanda's Royal Legacy</h2><p>The Nyiginya Dynasty shaped Rwanda's history, governance, and cultural identity. The dynasty ruled for centuries, establishing systems of law, land management, and cultural traditions that endure today.</p><h2>Royal Traditions</h2><ul><li>Coronation rituals and royal regalia, including the sacred drum (Kalinga)</li><li>Governance systems and succession, with kings (Abami) chosen from royal lineages</li><li>Influence on culture, law, and social organization</li></ul><h2>Historical Sites</h2><p>Key sites include the King's Palace in Nyanza and royal burial grounds, which are open to visitors and researchers.</p><h2>Legacy and Impact</h2><p>The dynasty's influence is still felt in modern Rwanda, with cultural practices and values rooted in royal history. Educational programs and museums help preserve and share this legacy.</p>`
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
      image: "/images/rwandan cuisine.png?height=200&width=300",
      tags: ["Cuisine", "Food", "Traditional", "Cooking", "Culture"],
  content: `<h2>Rwandan Cuisine: Flavors of Heritage</h2><p>Rwandan cuisine features staple foods like ubugali, beans, and plantains, prepared using traditional methods and shared during communal meals. Meals are often vegetarian, reflecting local agriculture and cultural preferences.</p><h2>Signature Dishes</h2><ul><li>Ubugali (cassava bread), a staple at most meals</li><li>Igikoma (sorghum porridge), served for breakfast and ceremonies</li><li>Isombe (cassava leaves), cooked with peanuts and spices</li><li>Brochettes (grilled meat skewers), popular at gatherings</li></ul><h2>Ceremonial Foods</h2><p>Special occasions feature dishes like akabenz (fried pork) and ibirayi (potatoes), prepared for weddings and festivals.</p><h2>Cultural Significance</h2><p>Food is central to Rwandan hospitality, with meals bringing families and communities together to celebrate heritage and unity. Sharing food is a sign of respect and friendship.</p><h2>Cooking Experiences</h2><p>Visitors can join cooking classes to learn traditional recipes and techniques from local chefs.</p>`
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
  content: `<h2>Rwandan Proverbs and Oral Traditions</h2><p>Proverbs are a vital part of Rwandan culture, offering wisdom, guidance, and insight into societal values. Proverbs are used in daily conversation, education, and conflict resolution.</p><h2>Popular Proverbs</h2><ul><li>"A bird does not forget its nest." (Never forget your roots)</li><li>"Unity is strength." (Working together brings success)</li><li>"Patience can cook a stone." (Perseverance overcomes obstacles)</li></ul><h2>Oral Storytelling</h2><p>Stories, songs, and poems are used to teach, entertain, and preserve history, ensuring cultural continuity across generations. Elders play a key role in passing down oral traditions.</p><h2>Role in Modern Rwanda</h2><p>Proverbs and storytelling are integrated into school curricula and community events, helping young people connect with their heritage.</p>`
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
  content: `<h2>Community-Based Tourism: Empowering Rwanda</h2><p>Community-based tourism empowers local communities, providing economic opportunities and fostering cultural exchange. Projects are managed by local leaders and focus on sustainability and cultural preservation.</p><h2>Case Studies</h2><ul><li>Village homestays, offering authentic experiences and direct income</li><li>Local craft workshops, teaching traditional skills and supporting artisans</li><li>Guided nature walks, led by community members with deep local knowledge</li></ul><h2>Benefits</h2><p>Tourism revenue supports education, healthcare, and infrastructure, improving quality of life for rural Rwandans. Community tourism also strengthens pride in local culture and traditions.</p><h2>How to Participate</h2><p>Travelers can book community tours through local agencies or online platforms, ensuring their visit benefits residents directly.</p>`
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
  content: `<h2>Traditional Healing Practices and Medicinal Plants</h2><p>Rwanda's traditional healers use indigenous plants and holistic methods to treat illness and promote wellness. Healing practices include herbal remedies, spiritual rituals, and massage.</p><h2>Medicinal Plants</h2><ul><li>Moringa, used for nutrition and immune support</li><li>Artemisia, effective against malaria</li><li>Aloe vera, applied for skin conditions and wounds</li><li>Neem, used for digestive health</li></ul><h2>Role of Healers</h2><p>Traditional healers (Abavuzi) are respected members of the community, consulted for both physical and spiritual health. They often collaborate with modern clinics for integrated care.</p><h2>Cultural Integration</h2><p>Traditional healing is respected and often integrated with modern healthcare, reflecting Rwanda's commitment to holistic well-being. Government programs support research and documentation of medicinal plants.</p><h2>Learning More</h2><p>Visitors can tour herbal gardens and meet healers to learn about Rwanda's unique approach to health and wellness.</p>`
    },
  ];

  return articles.find((article) => article.id === Number.parseInt(id));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(params.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, the documentation article you requested does not exist. Please check the link or browse all available documentation below.</p>
          <Button asChild variant="secondary">
            <Link href="/documentation">Browse All Documentation</Link>
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
