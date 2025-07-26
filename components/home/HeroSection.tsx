'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/back.jpg"
          alt="People celebrating in Rwanda landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to GiHomarts & Cultours Ltd
        </h1>
        <p className="text-lg md:text-xl mb-8 text-orange-300 leading-relaxed">
          Discover the beauty and culture of Rwanda with GiHomarts & Cultours Ltd, 
          your premier destination for unforgettable travel experiences. As a community 
          based tourism company located in the southern province of Rwanda, we are 
          dedicated to showcasing the rich heritage and natural wonders of our beloved country.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/destinations">Explore Our Tours</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-grey text-blue hover:bg-white hover:text-gray-900"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 