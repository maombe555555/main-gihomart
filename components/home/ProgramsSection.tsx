'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Program {
  _id: string
  name: string
  description: string
  duration?: string
  image?: string
}

interface ProgramsSectionProps {
  programs: Program[]
}

export function ProgramsSection({ programs }: ProgramsSectionProps) {
  if (programs.length === 0) return null

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Our Programs
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Explore our curated programs designed to showcase the best of Rwanda.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {program.image && (
                  <Image 
                    src={program.image} 
                    alt={program.name} 
                    fill 
                    className="object-cover" 
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
                {program.duration && (
                  <p className="text-sm text-muted-foreground">{program.duration}</p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 