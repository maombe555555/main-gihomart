"use client"

import { useEffect, useState } from "react"
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
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [useFileUpload, setUseFileUpload] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [editingAdId, setEditingAdId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editVideoUrl, setEditVideoUrl] = useState("")

  async function fetchAds() {
    setLoading(true)
    try {
      const res = await fetch("/api/ads?placement=home", { cache: "no-store" })
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
      let finalVideoUrl = videoUrl

      if (useFileUpload && videoFile) {
        const formData = new FormData()
        formData.append("file", videoFile)

        const uploadRes = await fetch("/api/admin/ads/upload", {
          method: "POST",
          body: formData,
        })

        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed")

        finalVideoUrl = uploadData.url
      }

      const res = await fetch("/api/admin/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, videoUrl: finalVideoUrl, placement: "home", isActive: true }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create ad")

      setTitle("")
      setVideoUrl("")
      setVideoFile(null)
      await fetchAds()
    } catch (e: any) {
      setError(e.message || "Error creating ad")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(adId: string) {
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/ads/${adId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, videoUrl: editVideoUrl }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to update ad")
      setEditingAdId(null)
      await fetchAds()
    } catch (e: any) {
      setError(e.message || "Error updating ad")
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
      {/* Create Ad */}
      <Card>
        <CardHeader>
          <CardTitle>Home page video ads</CardTitle>
          <CardDescription>Upload or link video ads for the Home page</CardDescription>
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
              <Label>Video Source</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={!useFileUpload ? "default" : "outline"}
                  onClick={() => setUseFileUpload(false)}
                >
                  Use Link
                </Button>
                <Button
                  type="button"
                  variant={useFileUpload ? "default" : "outline"}
                  onClick={() => setUseFileUpload(true)}
                >
                  Upload File
                </Button>
              </div>
            </div>

            {useFileUpload ? (
              <div className="mt-4">
                <Label htmlFor="videoFile">Upload Video</Label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
            ) : (
              <div className="mt-4">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://cdn.example.com/ads/video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                />
              </div>
            )}

            {videoUrl && !useFileUpload && (
              <video src={videoUrl} controls className="w-full rounded-md border mt-2" />
            )}
            {videoFile && useFileUpload && (
              <p className="text-sm text-gray-500 mt-2">File selected: {videoFile.name}</p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save ad"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Manage Ads */}
      <Card>
        <CardHeader>
          <CardTitle>Existing ads</CardTitle>
          <CardDescription>Manage activation, edit, and removal</CardDescription>
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
                      {editingAdId === ad._id ? (
                        <>
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="mb-2"
                          />
                          <Input
                            value={editVideoUrl}
                            onChange={(e) => setEditVideoUrl(e.target.value)}
                            className="mb-2"
                          />
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">{ad.title}</p>
                          <p className="text-xs text-gray-500">
                            Placement: {ad.placement} • Created:{" "}
                            {new Date(ad.createdAt).toLocaleString()}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {editingAdId === ad._id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(ad._id)}
                            disabled={submitting}
                          >
                            Save
                          </Button> 
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingAdId(null)}
                            disabled={submitting}
                          > 
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingAdId(ad._id)
                              setEditTitle(ad.title)
                              setEditVideoUrl(ad.videoUrl)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant={ad.isActive ? "outline" : "default"}
                            onClick={() => toggleActive(ad._id, !ad.isActive)}
                          >
                            {ad.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive" 
                            onClick={() => removeAd(ad._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <video src={ad.videoUrl} controls className="w-full rounded-md border" /> 
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}