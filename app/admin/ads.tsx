// app/admin/ads/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Ad = {
  _id: string
  title: string
  videoUrl: string
  isActive: boolean
  placement: "home" | "other"
  createdAt: string
}

export default function AdminAdsPage() {
  const router = useRouter()
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function fetchAds() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/ads?placement=home", { cache: "no-store" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load ads")
      setAds(data.ads || [])
    } catch (e: any) {
      setError(e.message || "Error loading ads")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, videoUrl, placement: "home", isActive: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create ad")
      setTitle("")
      setVideoUrl("")
      await fetchAds()
    } catch (e: any) {
      setError(e.message || "Error creating ad")
    } finally {
      setSubmitting(false)
    }
  }

  async function toggleActive(adId: string, nextActive: boolean) {
    try {
      const res = await fetch(`/api/admin/ads/${adId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to update ad")
      await fetchAds()
    } catch (e: any) {
      setError(e.message || "Error updating ad")
    }
  }

  async function removeAd(adId: string) {
    try {
      const res = await fetch(`/api/admin/ads/${adId}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to delete ad")
      await fetchAds()
    } catch (e: any) {
      setError(e.message || "Error deleting ad")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Home page video ads</CardTitle>
          <CardDescription>Upload and manage video ads for the Home page only</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Short ad title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                placeholder="https://cdn.example.com/ads/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Use a direct MP4 link or a streamable URL accessible to your frontend.
              </p>
            </div>

            {videoUrl && (
              <video
                src={videoUrl}
                controls
                className="w-full rounded-md border mt-2"
              />
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save ad"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing ads</CardTitle>
          <CardDescription>Manage activation and removal</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading ads...</p>
          ) : ads.length === 0 ? (
            <p className="text-gray-600">No ads found for Home page.</p>
          ) : (
            <div className="space-y-6">
              {ads.map((ad) => (
                <div key={ad._id} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{ad.title}</p>
                      <p className="text-xs text-gray-500">
                        Placement: {ad.placement} • Created: {new Date(ad.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={ad.isActive ? "secondary" : "default"}
                        onClick={() => toggleActive(ad._id, !ad.isActive)}
                      >
                        {ad.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button variant="destructive" onClick={() => removeAd(ad._id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                  <video src={ad.videoUrl} controls className="w-full rounded-md" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
