// app/components/ProgramsClient.tsx
"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export default function ProgramsClient() {
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const load = async () => {
      if (!API_BASE) {
        console.error("Missing NEXT_PUBLIC_API_URL")
        setPrograms([])
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`${API_BASE}/programs`)
        if (!res.ok) throw new Error("Programs fetch failed")
        const json = await res.json()
        if (!ignore) setPrograms(Array.isArray(json) ? json : [])
      } catch (err) {
        console.error("Programs error:", err)
        if (!ignore) setPrograms([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  if (loading) return null
  if (programs.length === 0) return null

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program._id ?? program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{program.description}</p>
                {program.schedule && <span className="text-sm font-medium text-blue-600">{program.schedule}</span>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
