"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const staticPrograms = [
  {
    id: 1,
    name: "Hiking & Helping Local Communities (Bees)",
    description: "Join our immersive hiking program at Bungwe Queen’s Park, where you not only explore breathtaking Rwandan landscapes but also contribute to local community projects. Learn about sustainable beekeeping practices, participate in conservation efforts, and support local artisans by browsing a curated selection of handcrafted souvenirs. This program is designed to foster environmental stewardship, cultural exchange, and economic empowerment for rural families.",
    image: "/images/handcraft.png",
    details: [
      {
        title: "Program Highlights",
        content: "Guided hikes through scenic trails, Workshops on sustainable beekeeping, Community engagement and conservation activities, Artisan market with local crafts"
      },
      {
        title: "What You'll Learn",
        content: "Rwandan flora and fauna, Beekeeping techniques and environmental impact, Local community development models"
      },
      {
        title: "Impact",
        content: "Your participation directly supports local families, helps preserve biodiversity, and promotes eco-friendly tourism."
      }
    ]
  },
  {
    id: 2,
    name: "Historical Communities & Queen Nyagakecuru",
    description: "Uncover the fascinating history of Rwanda’s powerful Queen Nyagakecuru and King Ruganzu II Ndoli. This program takes you on guided hikes through stunning landscapes and ancient sites, where you’ll learn about legendary rulers, royal traditions, and the cultural heritage of the region.",
    image: "/images/historical.png",
    details: [
      {
        title: "Program Highlights",
        content: "Visits to historical monuments and archaeological sites, Storytelling sessions with local historians, Traditional ceremonies and cultural performances"
      },
      {
        title: "What You'll Learn",
        content: "Rwandan royal history and legends, The role of women in leadership, Preservation of cultural heritage"
      },
      {
        title: "Impact",
        content: "Gain a deep understanding of Rwanda’s past and its influence on modern society."
      }
    ]
  },
  {
    id: 3,
    name: "RESEARCH & Preservation of Heritage",
    description: "Become part of our research initiative dedicated to discovering, documenting, and preserving Rwanda’s historical sites. This program is ideal for students, academics, and enthusiasts interested in cultural heritage management.",
    image: "/images/research.png",
    details: [
      {
        title: "Program Highlights",
        content: "Fieldwork and mapping of ancient settlements, Recording oral histories, Publishing research findings"
      },
      {
        title: "What You'll Learn",
        content: "Research methods in heritage management, Digital archiving and documentation, Collaboration with local experts"
      },
      {
        title: "Impact",
        content: "Help safeguard Rwanda’s cultural treasures for future generations."
      }
    ]
  },
  {
    id: 4,
    name: "INTERNSHIPS in Tourism & Conservation",
    description: "We offer hands-on internship opportunities for students and professionals seeking experience in community-based tourism, conservation, and cultural heritage management.",
    image: "/images/intership.png",
    details: [
      {
        title: "Program Highlights",
        content: "Work with local organizations, Project planning and implementation, Eco-tourism and wildlife conservation"
      },
      {
        title: "What You'll Learn",
        content: "Sustainable tourism development, Event management, Cultural education and outreach"
      },
      {
        title: "Impact",
        content: "Build practical skills, receive mentorship, and make a positive impact in Rwanda’s tourism and conservation sectors."
      }
    ]
  },
  {
    id: 5,
    name: "BANANA BREWING Experience",
    description: "Discover the art and tradition of banana beer brewing, a cherished Rwandan cultural practice. This program invites you to participate in every step of the brewing process, from harvesting bananas to fermentation and tasting.",
    image: "/images/banana.png",
    details: [
      {
        title: "Program Highlights",
        content: "Hands-on banana beer brewing workshops, Cultural storytelling and music, Food pairings and tastings"
      },
      {
        title: "What You'll Learn",
        content: "History and social significance of banana beer, Brewing techniques, Culinary heritage of Rwanda"
      },
      {
        title: "Impact",
        content: "Experience a unique tradition and support local brewers and food artisans."
      }
    ]
  }
];

export default function ProgramDetailPage() {
  const params = useParams();
  const id = Number(params?.id ?? 0);
  const program = staticPrograms.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar */}
        <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
            <Navigation />
          </div>
        </nav>
        {/* Spacer for fixed nav */}
        <div className="h-16" />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Program Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, the program you requested does not exist. Please check the link or browse all available programs below.</p>
          <Button asChild variant="secondary">
            <Link href="/programs">Browse All Programs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Top Navigation Bar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo and Brand Block */}
          <div className="flex items-center gap-4">
            <img src="/images/logooo.jpg" alt="GiHomArts & Cultours Ltd Logo" className="h-12 w-12 rounded-full border border-gray-300" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-black leading-tight">GiHomArts &amp; Cultours Ltd</span>
              <span className="text-base text-gray-500 font-normal -mt-1">My Heritage Today &amp; Tomorrow</span>
            </div>
          </div>
          {/* Navigation Links */}
          <nav className="flex gap-6 items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</a>
            <a href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition">Programs</a>
            <a href="/booking" className="text-gray-700 hover:text-blue-600 font-medium transition">Booking</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</a>
          </nav>
        </div>
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-16" />
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <div className="relative h-64 w-full mb-6">
            <Image src={program.image || "/images/logooo.jpg"} alt={program.name} fill className="object-cover rounded-lg" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">{program.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">{program.description}</p>
            {program.details && program.details.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-700">{section.title}</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {section.content.split(",").map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
            <Button asChild variant="outline">
              <Link href="/programs">Back to Programs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
