// app/components/AdsClient.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

interface VideoAd {
  id: number
  videoUrl: string
  linkUrl: string
  title: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export default function AdsClient() {
  const [videoAds, setVideoAds] = useState<VideoAd[]>([])
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    const fetchAds = async () => {
      if (!API_BASE) {
        setError("Missing NEXT_PUBLIC_API_URL")
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/ads`)
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const json = await res.json()
        const ads = Array.isArray(json?.ads) ? json.ads : []
        if (!ignore) {
          setVideoAds(ads)
          setError(ads.length ? null : "No ads returned")
        }
      } catch (err) {
        console.error("Ads fetch error:", err)
        if (!ignore) setError("Failed to load ads")
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchAds()
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    if (videoAds.length <= 1) return
    const id = setInterval(() => setCurrentAdIndex((p) => (p + 1) % videoAds.length), 5000)
    return () => clearInterval(id)
  }, [videoAds])

  const currentAd = videoAds[currentAdIndex]

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-2 bg-gray-900 p-3 rounded-l-lg shadow-2xl border-2 border-orange-600 w-36 py-4 px-2">
      {loading && <span className="text-orange-400 text-sm">Loading Ads...</span>}
      {error && !loading && <span className="text-red-500 text-sm text-center px-2">{error}</span>}
      {!loading && !error && currentAd && (
        <>
          <Link href={currentAd.linkUrl} target="_blank" rel="noreferrer" className="block w-full h-64 rounded-tl-lg rounded-bl-lg overflow-hidden">
            <iframe
              src={currentAd.videoUrl}
              title={currentAd.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Link>

          {videoAds.length > 1 && (
            <>
              <Button size="icon" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full" onClick={() => setCurrentAdIndex((p) => (p + 1) % videoAds.length)} aria-label="Next Video Ad">
                <RotateCw className="w-5 h-5" />
              </Button>
              <span className="text-xs text-orange-400 select-none">{currentAdIndex + 1} / {videoAds.length}</span>
            </>
          )}
        </>
      )}
    </div>
  )
}
