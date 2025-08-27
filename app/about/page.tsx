import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Globe, Award, Eye } from "lucide-react"
import { Fragment } from "react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We prioritize the well-being and development of local communities in all our tourism initiatives.",
    },
    {
      icon: Globe,
      title: "Cultural Preservation",
      description: "Dedicated to preserving and showcasing Rwanda's rich cultural heritage for future generations.",
    },
    {
      icon: Users,
      title: "Authentic Experiences",
      description: "We provide genuine, immersive experiences that connect visitors with local traditions and people.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional service and unforgettable travel experiences.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* About Us Intro Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-8 px-2 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl text-orange-100 leading-relaxed">
            GiHomArts & Cultours Ltd is a vibrant community-based tourism enterprise in Rwanda, dedicated to preserving the country's cultural heritage and natural beauty. With a focus on immersive experiences, sustainable practices, and community empowerment, we offer a range of unforgettable adventures. From thrilling hikes in the Huye Mountains to cultural and historical tours, each journey with us promises meaningful connections and unforgettable memories.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section - side by side on desktop, stacked on mobile */}
      <section className="py-8 px-2 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-orange-700">Our Mission</h2>
            <Badge className="mb-2 bg-orange-100 text-orange-800 text-lg px-4 py-2">Mission Statement</Badge>
            <p className="text-lg text-muted-foreground">
              At GiHomArts & Cultours Ltd, our mission is to promote sustainable tourism practices, preserve cultural heritage, and empower local communities. Through job creation, community development initiatives, and environmental conservation efforts, we strive to make a positive impact on the lives of those we serve.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-orange-700">Our Vision</h2>
            <Badge className="mb-2 bg-orange-100 text-orange-800 text-lg px-4 py-2">Vision Statement</Badge>
            <p className="text-lg text-muted-foreground">
              We envision a future where tourism serves as a catalyst for positive social change and economic development in Rwanda. By fostering meaningful connections between travelers and local communities, we aim to create a more equitable and sustainable tourism industry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-10 px-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800">Our Story</Badge>
              <h2 className="text-3xl font-bold mb-4">Connecting Cultures, Preserving Heritage</h2>
              <p className="text-lg text-muted-foreground mb-4">
                GiHomarts & Cultours Ltd was founded with a simple yet powerful mission: to showcase the incredible beauty, culture, and heritage of Rwanda while supporting local communities through sustainable tourism.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Based in Rwanda's Southern Province, we are more than just a tourism company. We are cultural ambassadors, community advocates, and passionate storytellers who believe that travel should be transformative for both visitors and the communities they encounter.
              </p>
              <p className="text-lg text-muted-foreground">
                Our team consists of local experts, cultural historians, and experienced guides who are deeply rooted in Rwandan traditions and committed to sharing authentic experiences with travelers from around the world.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/images/miss.jpg?height=400&width=500"
                alt="Rwanda cultural heritage"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="py-8 px-2 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape every experience we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-8 px-2 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-orange-700">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals behind GiHomarts & Cultours Ltd
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example team members, replace with real data as needed */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/images/team1.jpg" alt="Team Member 1" width={96} height={96} className="object-cover" />
                </div>
                <CardTitle className="text-xl">KAJUGA Jerome</CardTitle>
                <CardDescription className="text-base">Founder & Managing Director</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/images/team2.jpg" alt="Team Member 2" width={96} height={96} className="object-cover" />
                </div>
                <CardTitle className="text-xl">NIYOSENGA Aimable</CardTitle>
                <CardDescription className="text-base">Tour Operation Manager</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/images/sales.png" alt="Team Member 3" width={96} height={96} className="object-cover" />
                </div>
                <CardTitle className="text-xl">MASENGESHO Emmanuel</CardTitle>
                <CardDescription className="text-base"> Sales and Marketing Mananger</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/images/team4.jpg" alt="Team Member 4" width={96} height={96} className="object-cover" />
                </div>
                <CardTitle className="text-xl">NGENZI Cedrick</CardTitle>
                <CardDescription className="text-base">Guide</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/images/team4.jpg" alt="Team Member 4" width={96} height={96} className="object-cover" />
                </div>
                <CardTitle className="text-xl">NIYIGENA Ernestine</CardTitle>
                <CardDescription className="text-base">Guide</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-10 px-2 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Our Impact</h2>
            <p className="text-lg text-muted-foreground">Making a difference in communities across Rwanda</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <p className="text-lg font-medium mb-2">Travelers Hosted</p>
              <p className="text-muted-foreground">From around the world</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
              <p className="text-lg font-medium mb-2">Communities Supported</p>
              <p className="text-muted-foreground">Across Southern Province</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
              <p className="text-lg font-medium mb-2">Local Jobs Created</p>
              <p className="text-muted-foreground">Through tourism initiatives</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
