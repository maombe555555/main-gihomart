"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([])
  useEffect(() => {
    fetch("/api/programs")
      .then(res => res.json())
      .then(setPrograms)
      .catch(() => setPrograms([]))
  }, [])

  const staticPrograms = [
    {
      name: "HANDCRAFTS SHOP",
      description: "Visit our reception area (Bungwe Queen’s Park) to browse a curated selection of handcrafted souvenirs, showcasing the talents of local artisans and providing meaningful mementos of your Rwandan adventure.",
      image: "/images/handcraft.png"
    },
    {
      name: "HISTORICAL TOURS",
      description: "Uncover the fascinating history of Rwanda's powerful Queen Nyagakecuru and Ruganzu II Ndoli. Hike through stunning landscapes and historical sites as you unravel the mysteries of Rwanda's past.",
      image: "/images/historical.png"
    },
    {
      name: "RESEARCH",
      description: "We actively discover, research, network, and publish historical sites dedicated to the legacy of King Ruganzu II Ndoli and his royal army IBISUMIZI, ensuring that these invaluable cultural treasures are preserved for future generations.",
      image: "/images/research.png"
    },
    {
      name: "INTERNSHIPS",
      description: "We offer internship opportunities for students and professionals seeking hands-on experience in community-based tourism, conservation, and cultural heritage management.",
      image: "/images/intership.png"
    },
    {
      name: "RICE PLANTATION TOUR",
      description: "Visit local rice fields and learn about the traditional and modern rice cultivation and harvesting techniques. Engage with farmers and gain insights into Rwanda’s agricultural heritage.",
      image: "/images/rice.png"
    },
    {
      name: "BANANA BREWING",
      description: "Discover the art of traditional banana beer brewing, a cherished Rwandan cultural practice. Participate in the brewing process and enjoy the unique taste of this local specialty.",
      image: "/images/banana.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Programs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Static Programs */}
          {staticPrograms.map((program, idx) => (
            <Card key={program.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={program.image || "/images/logooo.jpg"} alt={program.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{program.description}</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/programs">Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {programs.length > 0 ? programs.map((program: any) => (
            <Card key={program._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{program.description}</p>
                {program.schedule && (
                  <div className="text-sm text-blue-700 font-medium">Schedule: {program.schedule}</div>
                )}
              </CardContent>
            </Card>
          )) : null}
        </div>
      </div>
    </div>
  )
} 