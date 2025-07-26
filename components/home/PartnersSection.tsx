'use client'

import Image from "next/image"

const partners = [
  { name: "Rwanda Tourism Board", logo: "/placeholder.svg?height=60&width=120" },
  { name: "UNESCO", logo: "/placeholder.svg?height=60&width=120" },
  { name: "CNRU", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Travel Partners", logo: "/placeholder.svg?height=60&width=120" },
]

export function PartnersSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Our Partners
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            We work with trusted partners to provide you with the best experiences.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex justify-center items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 