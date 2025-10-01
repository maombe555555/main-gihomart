"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    fetch("/api/programs")
      .then(res => res.json())
      .then(setPrograms)
      .catch(() => setPrograms([]));
  }, []);

  const staticPrograms = [
    {
      name: "Hiking & Helping Local Communities (Bees)",
      description: "Join our immersive hiking program at Bungwe Queen’s Park, where you not only explore breathtaking Rwandan landscapes but also contribute to local community projects. Learn about sustainable beekeeping practices, participate in conservation efforts, and support local artisans by browsing a curated selection of handcrafted souvenirs. This program is designed to foster environmental stewardship, cultural exchange, and economic empowerment for rural families. Your adventure includes guided hikes, educational workshops, and opportunities to engage with community leaders and beekeepers, making your visit both meaningful and memorable.",
      image: "/images/handcraft.png",
      id: 1
    },
    {
      name: "Historical Communities & Queen Nyagakecuru",
      description: "Uncover the fascinating history of Rwanda’s powerful Queen Nyagakecuru and King Ruganzu II Ndoli. This program takes you on guided hikes through stunning landscapes and ancient sites, where you’ll learn about legendary rulers, royal traditions, and the cultural heritage of the region. Participants will visit historical monuments, hear stories from local historians, and experience traditional ceremonies. The journey is enriched with interactive activities, such as storytelling sessions, cultural performances, and hands-on exploration of archaeological sites, providing a deep understanding of Rwanda’s past and its impact on present-day communities.",
      image: "/images/historical.png",
      id: 2
    },
    {
      name: "RESEARCH & Preservation of Heritage",
      description: "Become part of our research initiative dedicated to discovering, documenting, and preserving Rwanda’s historical sites. This program is ideal for students, academics, and enthusiasts interested in cultural heritage management. Participants will collaborate with local experts to map ancient settlements, record oral histories, and publish findings about the legacy of King Ruganzu II Ndoli and his royal army IBISUMIZI. The program includes fieldwork, networking events, and workshops on digital archiving, ensuring that Rwanda’s invaluable cultural treasures are safeguarded for future generations.",
      image: "/images/research.png",
      id: 3
    },
    {
      name: "INTERNSHIPS in Tourism & Conservation",
      description: "We offer hands-on internship opportunities for students and professionals seeking experience in community-based tourism, conservation, and cultural heritage management. Interns will work alongside local organizations, participate in project planning, and contribute to sustainable tourism initiatives. The program covers areas such as eco-tourism development, wildlife conservation, event management, and cultural education. Interns gain practical skills, mentorship, and a chance to make a positive impact while building their careers in the tourism and conservation sectors.",
      image: "/images/intership.png",
      id: 4
    },
    {
      name: "BANANA BREWING Experience",
      description: "Discover the art and tradition of banana beer brewing, a cherished Rwandan cultural practice. This program invites you to participate in every step of the brewing process, from harvesting bananas to fermentation and tasting. Learn about the history and social significance of banana beer in Rwandan celebrations, join local brewers for hands-on workshops, and enjoy cultural storytelling around the brewing ritual. The experience is complemented by food pairings, music, and opportunities to purchase locally made beverages, making it a unique and flavorful journey into Rwanda’s culinary heritage.",
      image: "/images/banana.png",
      id: 5
    }
  ];

  const { toast } = require("@/components/ui/use-toast");
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Programs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Static Programs */}
          {staticPrograms.map((program, idx) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={program.image || "/images/logooo.jpg"} alt={program.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{program.description}</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/programs/${program.id}`}>Read More</Link>
                  </Button>
                  <Button asChild variant="default" size="sm">
                    <Link href={`/booking?program=${encodeURIComponent(program.name)}`}>Book Now</Link>
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => {
                    const selected = JSON.parse(localStorage.getItem("selectedPrograms") || "[]");
                    if (!selected.some((p:any) => p.name === program.name)) {
                      selected.push(program);
                      localStorage.setItem("selectedPrograms", JSON.stringify(selected));
                      toast({ title: "Added to Booking", description: `${program.name} has been added to your booking.` });
                      window.location.reload();
                    }
                  }}>
                    Add to Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {programs.length > 0 && programs.map((program: any) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}