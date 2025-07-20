import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Star, Globe2, Lightbulb } from "lucide-react"

export default function VisionPage() {
  const pillars = [
    {
      icon: Star,
      title: "Excellence in Service",
      description:
        "To be recognized as the premier cultural tourism provider in Rwanda, setting the standard for authentic and meaningful travel experiences.",
    },
    {
      icon: Globe2,
      title: "Global Recognition",
      description:
        "To put Rwanda's Southern Province on the global tourism map as a must-visit destination for cultural and heritage tourism.",
    },
    {
      icon: Lightbulb,
      title: "Innovation in Tourism",
      description:
        "To pioneer innovative approaches to community-based tourism that can be replicated across Africa and beyond.",
    },
  ]

  const goals = [
    {
      year: "2025",
      title: "Regional Leadership",
      description: "Establish ourselves as the leading cultural tourism operator in Rwanda's Southern Province",
    },
    {
      year: "2027",
      title: "National Recognition",
      description: "Become a nationally recognized brand for authentic Rwandan cultural experiences",
    },
    {
      year: "2030",
      title: "International Impact",
      description: "Serve as a model for sustainable community-based tourism across East Africa",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vision</h1>
          <p className="text-xl text-orange-100">Shaping the future of cultural tourism in Rwanda and beyond</p>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Eye className="w-16 h-16 text-orange-600" />
          </div>
          <Badge className="mb-6 bg-orange-100 text-orange-800 text-lg px-4 py-2">Vision Statement</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            To be the leading catalyst for cultural preservation and community empowerment in Rwanda, creating a
            sustainable tourism model that inspires the world.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We envision a future where Rwanda's cultural heritage thrives through tourism, where every visitor becomes
            an ambassador for our culture, and where local communities prosper while maintaining their authentic
            traditions.
          </p>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three fundamental pillars that support our long-term vision for cultural tourism in Rwanda
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <pillar.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{pillar.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey Forward</h2>
            <p className="text-lg text-muted-foreground">Key milestones on our path to realizing our vision</p>
          </div>

          <div className="space-y-8">
            {goals.map((goal, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {goal.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">{goal.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Our Vision</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Our vision can only be realized through collaboration with travelers, communities, partners, and
            stakeholders who share our commitment to cultural preservation and sustainable tourism. Together, we can
            create a lasting positive impact on Rwanda's cultural landscape.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-orange-600">For Travelers</h4>
              <p className="text-sm text-muted-foreground">
                Experience authentic Rwanda while contributing to community development and cultural preservation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-orange-600">For Communities</h4>
              <p className="text-sm text-muted-foreground">
                Partner with us to showcase your heritage while building sustainable economic opportunities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-orange-600">For Partners</h4>
              <p className="text-sm text-muted-foreground">
                Collaborate with us to develop innovative tourism solutions that benefit all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
