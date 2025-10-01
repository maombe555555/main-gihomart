'use client'


import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const travelArticles = [
  {
    id: 1,
    title: "Cycling Through Rwanda's Hills",
    image: "/images/huye tour.jpg?height=200&width=300",
    excerpt: "Discover the beauty of Rwanda's landscape on two wheels",
    fullText: `Huye, Rwanda’s cultural and academic capital, offers more than intellectual depth—it’s a landscape of rolling hills, quiet trails, and scenic routes that invite cyclists into a journey of discovery. Whether you’re a student seeking weekend refreshment or a traveler exploring Rwanda’s southern charm, cycling through Huye’s hills is a soulful experience that blends nature, culture, and community.

The terrain around Huye is ideal for moderate cycling. Gentle slopes wind past banana plantations, eucalyptus groves, and red-soil paths that connect villages and farms. Riders can start from the University of Rwanda’s Huye Campus and venture toward Ruhande Arboretum, a peaceful forest with shaded trails and rare plant species. From there, routes extend toward Tumba, Ngoma, and Gishamvu, offering panoramic views of valleys and traditional homesteads.

Cycling in Huye is not just about movement—it’s about immersion. Along the way, riders encounter local artisans weaving baskets, farmers tending fields, and children waving from roadside paths. These moments foster connection and reflect the warmth of Rwandan hospitality. For those interested in cultural stops, the National Ethnographic Museum provides a perfect midpoint for rest and reflection, with exhibits that deepen appreciation for Rwanda’s heritage.`,
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Community Tourism Impact",
    image: "/images/today.jpg?height=200&width=300",
    excerpt: "Explore how tourism transforms lives in Rwanda—empowering communities, celebrating culture, and creating lasting impact. Click Read More to discover Huye’s vibrant story.",
    fullText: `Nestled in the southern province of Rwanda, Huye—formerly known as Butare—is widely regarded as the country’s cultural and intellectual capital. With its rich history, vibrant academic life, and deep-rooted traditions, Huye offers visitors a unique window into Rwanda’s soul.
One of Huye’s most iconic landmarks is the National Ethnographic Museum, home to the largest collection of cultural artifacts in Rwanda. From traditional tools and musical instruments to ceremonial clothing and ancient crafts, the museum provides a comprehensive journey through Rwanda’s pre-colonial, colonial, and post-independence eras. Visitors can explore full-scale dioramas, listen to guided stories, and witness live performances of traditional dance and drumming2.

Beyond the museum, Huye’s charm lies in its community life and architecture. The city’s colonial-era buildings, red-brick Catholic cathedral, and leafy boulevards reflect a blend of historical depth and modern development. Thanks to urban renewal projects, Huye now boasts clean, green spaces and improved infrastructure, making it both welcoming and walkable.

Huye is also home to the University of Rwanda’s Huye Campus, formerly the National University of Rwanda. This academic hub has earned the city a reputation as Rwanda’s intellectual center. The surrounding Arboretum of Ruhande, established in 1933, offers a tranquil escape and a chance to explore indigenous and exotic plant species.

For those seeking authentic cultural experiences, Huye provides access to community-based tourism. Visitors can engage with local artisans, participate in traditional cooking and brewing (such as ikigage), and join guided tours to nearby villages. These interactions foster mutual understanding and support local livelihoods.`,
    readTime: "6 min read",
  },
]

export function TravelArticlesSection() {
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-orange-700">
            Travel Articles
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-orange-700">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{article.readTime}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                {article.fullText ? (
                  <button
                    className="text-orange-600 hover:text-orange-700 font-medium border border-orange-200 rounded px-3 py-1 transition-colors"
                    onClick={() => setOpenModalId(article.id)}
                  >
                    Read More →
                  </button>
                ) : (
                  <Link
                    href={`/blog/${article.id}`}
                    className="text-orange-600 hover:text-orange-700 font-medium border border-orange-200 rounded px-3 py-1 transition-colors"
                  >
                    Read More →
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Modal for fullText */}
        {travelArticles.map(
          (article) =>
            article.fullText && openModalId === article.id ? (
              <div
                key={article.id}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                onClick={() => setOpenModalId(null)}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative border border-orange-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-2xl font-bold focus:outline-none"
                    aria-label="Close modal"
                    onClick={() => setOpenModalId(null)}
                  >
                    ×
                  </button>
                  <h3 className="text-3xl font-bold mb-6 text-orange-700 text-center">{article.title}</h3>
                  <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-base md:text-lg">
                      {article.fullText}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
        )}
      </div>
    </section>
  )
} 