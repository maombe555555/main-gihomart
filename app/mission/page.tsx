import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Compass, Users, Leaf } from "lucide-react"

export default function MissionPage() {
  const objectives = [
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Empower local communities through sustainable tourism that creates jobs and preserves traditions.",
    },
    {
      icon: Compass,
      title: "Cultural Preservation",
      description: "Safeguard and promote Rwanda's rich cultural heritage for current and future generations.",
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description: "Develop eco-friendly tourism practices that protect our natural environment.",
    },
    {
      icon: Target,
      title: "Authentic Experiences",
      description: "Provide genuine cultural exchanges that benefit both visitors and local communities.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Well-arranged Header Navigation Bar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow border-b border-gray-200">
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
      </header>
      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-orange-100">
            Dedicated to preserving heritage and empowering communities through sustainable tourism
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-800 text-lg px-4 py-2">Mission Statement</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            To showcase Rwanda's rich cultural heritage while empowering local communities through sustainable,
            authentic tourism experiences that preserve our traditions for future generations.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that tourism should be a force for good, creating meaningful connections between visitors and
            communities while ensuring that our cultural treasures are protected and celebrated.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Key Objectives</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our key objectives serve as the foundation of our mission, guiding every decision and initiative we undertake. These objectives are designed to ensure that our efforts not only benefit visitors but also empower local communities and preserve Rwanda's unique cultural and natural heritage. By focusing on community empowerment, cultural preservation, sustainable tourism, and authentic experiences, we strive to create a tourism model that is inclusive, responsible, and impactful for all stakeholders.
              <br /><br />
              Each objective is carefully crafted to address the unique opportunities and challenges within Rwanda's tourism sector. Community empowerment ensures that local people are not just participants, but leaders and beneficiaries of tourism growth. Cultural preservation safeguards the traditions, languages, and arts that define our national identity, passing them on to future generations. Sustainable tourism practices protect our environment and resources, ensuring that tourism remains a positive force for years to come. By prioritizing authentic experiences, we foster genuine connections between visitors and hosts, creating memories that are meaningful and transformative for everyone involved.
              <br /><br />
              Together, these objectives form a holistic approach that balances economic growth, social responsibility, and environmental stewardship, ensuring that tourism in Rwanda is a catalyst for positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <objective.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">{objective.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{objective.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Achieve Our Mission */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Achieve Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We achieve our mission by blending traditional wisdom with innovative, sustainable practices. Our approach is deeply collaborative, involving local communities at every stage to ensure their voices are heard and their needs are met. Through educational programs, eco-friendly initiatives, and the celebration of cultural heritage, we foster meaningful connections between visitors and hosts. Our commitment to quality, respect, and sustainability ensures that every experience is enriching, memorable, and beneficial for both guests and the communities they visit.
              <br /><br />
              Central to our strategy is the empowerment of local leaders and organizations, who play a vital role in shaping tourism initiatives that reflect their unique perspectives and aspirations. We invest in capacity-building, training, and resource-sharing to equip communities with the tools they need to thrive. Our partnerships extend to government agencies, NGOs, and private sector stakeholders, creating a network of support that amplifies our impact.
              <br /><br />
              We also prioritize transparency and accountability, regularly evaluating our programs to ensure they deliver tangible benefits and align with our core values. By embracing innovation and adapting to changing circumstances, we remain resilient and forward-thinking, always seeking new ways to enhance the positive effects of tourism while minimizing any negative impacts. This holistic, inclusive approach is what sets us apart and drives our ongoing success.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Community Partnership</h3>
                <p className="text-muted-foreground">
                  We work directly with local communities, ensuring they are active participants and beneficiaries of
                  tourism development. Our partnerships are built on mutual respect and shared benefits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Cultural Education</h3>
                <p className="text-muted-foreground">
                  Through immersive experiences, storytelling, and hands-on activities, we educate visitors about
                  Rwanda's history, traditions, and contemporary culture while fostering cross-cultural understanding.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Sustainable Practices</h3>
                <p className="text-muted-foreground">
                  We implement eco-friendly tourism practices that minimize environmental impact while maximizing
                  positive social and economic outcomes for local communities.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Heritage Preservation</h3>
                <p className="text-muted-foreground">
                  We actively document, preserve, and promote traditional crafts, stories, music, and customs, ensuring
                  they remain vibrant parts of contemporary Rwandan life.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Economic Empowerment</h3>
                <p className="text-muted-foreground">
                  By creating employment opportunities and supporting local businesses, we help communities build
                  sustainable livelihoods while maintaining their cultural identity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Quality Experiences</h3>
                <p className="text-muted-foreground">
                  We maintain high standards in all our offerings, ensuring that every visitor has a meaningful, safe,
                  and transformative experience that creates lasting memories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Pillars */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Vision Pillars</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our vision pillars represent the core values and long-term aspirations that shape our organization's future. These pillars include:
            <br /><br />
            Each pillar is a guiding light that informs our strategy and daily actions. Sustainability is at the heart of our operations, ensuring that every initiative we undertake protects the environment and supports the well-being of local communities for generations to come. Cultural integrity drives us to honor, preserve, and celebrate Rwanda's diverse traditions, languages, and artistic expressions, making them accessible and relevant in a modern context. Community engagement is more than participation—it is about empowering local voices, fostering leadership, and ensuring that benefits are shared equitably. Excellence in experience reflects our unwavering commitment to quality, safety, and authenticity, guaranteeing that every visitor leaves with a deeper understanding and appreciation of Rwanda.
            <br /><br />
            Together, these pillars form a resilient foundation that enables us to adapt, innovate, and lead in the field of sustainable tourism, always striving to create positive, lasting change.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">Sustainability</h3>
              <p className="text-muted-foreground mb-4">Ensuring that tourism development protects the environment and supports the well-being of local communities.</p>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">Cultural Integrity</h3>
              <p className="text-muted-foreground mb-4">Preserving and promoting Rwanda's rich traditions, languages, and arts.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">Community Engagement</h3>
              <p className="text-muted-foreground mb-4">Actively involving local people in tourism planning, decision-making, and benefit-sharing.</p>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">Excellence in Experience</h3>
              <p className="text-muted-foreground mb-4">Delivering high-quality, authentic, and transformative experiences for every visitor.</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-8">
            Together, these pillars guide us toward a future where tourism is a force for good, fostering pride, prosperity, and understanding.
          </p>
        </div>
      </section>

      {/* Our Journey Forward */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Journey Forward</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Looking ahead, our journey is one of continuous growth, learning, and adaptation. We are committed to expanding our impact by forging new partnerships, embracing innovative solutions, and responding to the evolving needs of both travelers and communities. Our journey forward is guided by a steadfast dedication to our mission and vision, ensuring that we remain at the forefront of sustainable and responsible tourism in Rwanda. We invite you to join us on this journey, as we work together to create a brighter, more inclusive future for all.
            <br /><br />
            As we move forward, we are focused on deepening our engagement with local communities, investing in education and capacity-building, and leveraging technology to enhance both visitor experiences and community benefits. We recognize that the path to sustainable tourism is ever-evolving, requiring us to remain agile, open to feedback, and committed to best practices. By fostering a culture of collaboration and innovation, we aim to set new standards for excellence in the industry.
            <br /><br />
            Our journey is not one we take alone. We value the support and participation of our partners, stakeholders, and visitors, whose contributions are vital to our shared success. Together, we can ensure that Rwanda's cultural and natural treasures are celebrated and protected for generations to come, making tourism a true force for good.
          </p>
        </div>
      </section>
    </div>
  )
}
