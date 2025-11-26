"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Video,
  Link as LinkIcon,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  Save,
  X,
  Upload,
  Link
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Ad {
  id: string;
  title: string;
  videoUrl: string;
  linkUrl: string;
  isActive: boolean;
  placement: "home" | "other";
  createdAt: string;
}

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"link" | "file">("link")
  const [newAd, setNewAd] = useState({
    title: "",
    videoUrl: "",
    linkUrl: "",
    placement: "home" as "home" | "other",
    isActive: true
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/ads")
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.success && Array.isArray(data.ads)) {
          const validatedAds = data.ads.map((ad: any) => ({
            id: ad.id || ad._id || '',
            title: ad.title || 'Untitled Ad',
            videoUrl: ad.videoUrl || '',
            linkUrl: ad.linkUrl || '#',
            isActive: ad.isActive !== undefined ? ad.isActive : true,
            placement: ad.placement || 'home',
            createdAt: ad.createdAt || new Date().toISOString(),
          }))
          setAds(validatedAds)
        } else {
          setAds([])
        }
      } else {
        setError(`Failed to load ads: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const toggleAdStatus = async (adId: string, currentStatus: boolean) => {
    try {
      setError(null)
      
      const response = await fetch("/api/ads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: adId,
          isActive: !currentStatus
        }),
      })

      if (response.ok) {
        setAds(prev => prev.map(ad => 
          ad.id === adId ? { ...ad, isActive: !currentStatus } : ad
        ))
      } else {
        setError("Failed to update ad status")
      }
    } catch (error) {
      setError(`Error updating ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteAd = async (adId: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return

    try {
      setError(null)
      
      const response = await fetch(`/api/ads?id=${adId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAds(prev => prev.filter(ad => ad.id !== adId))
      } else {
        setError("Failed to delete ad")
      }
    } catch (error) {
      setError(`Error deleting ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleFileUpload = (file: File) => {
    // In a real application, you would upload to cloud storage
    // For now, we'll create a local URL for preview
    const videoUrl = URL.createObjectURL(file)
    setNewAd(prev => ({ ...prev, videoUrl }))
    setSelectedFile(file)
  }

  const createAd = async () => {
    try {
      setError(null)
      
      if (!newAd.title) {
        setError("Title is required")
        return
      }

      if (uploadMethod === "link" && !newAd.videoUrl) {
        setError("Video URL is required when using link")
        return
      }

      if (uploadMethod === "file" && !selectedFile) {
        setError("Please select a video file")
        return
      }

      let finalVideoUrl = newAd.videoUrl

      // If file upload, you would typically upload to cloud storage here
      // For demo, we'll use a placeholder
      if (uploadMethod === "file" && selectedFile) {
        finalVideoUrl = `https://example.com/uploads/${selectedFile.name}`
        // In real app: await uploadToCloudStorage(selectedFile)
      }

      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAd,
          videoUrl: finalVideoUrl
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAds(prev => [data.ad, ...prev])
          setIsCreateModalOpen(false)
          setNewAd({
            title: "",
            videoUrl: "",
            linkUrl: "",
            placement: "home",
            isActive: true
          })
          setSelectedFile(null)
          setUploadMethod("link")
        }
      } else {
        setError("Failed to create ad")
      }
    } catch (error) {
      setError(`Error creating ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const updateAd = async () => {
    if (!editingAd) return

    try {
      setError(null)
      
      if (!editingAd.title || !editingAd.videoUrl) {
        setError("Title and video URL are required")
        return
      }

      const response = await fetch("/api/ads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingAd.id,
          title: editingAd.title,
          videoUrl: editingAd.videoUrl,
          linkUrl: editingAd.linkUrl,
          placement: editingAd.placement,
          isActive: editingAd.isActive
        }),
      })

      if (response.ok) {
        setAds(prev => prev.map(ad => 
          ad.id === editingAd.id ? editingAd : ad
        ))
        setEditingAd(null)
      } else {
        setError("Failed to update ad")
      }
    } catch (error) {
      setError(`Error updating ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const filteredAds = ads.filter(ad => 
    (ad.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (ad.placement?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const getPlacementColor = (placement: string) => {
    const safePlacement = placement || 'home'
    switch (safePlacement) {
      case 'home': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'other': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusCount = (isActive: boolean) => {
    return ads.filter(ad => ad.isActive === isActive).length
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Invalid date'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading ads from database...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ad Management</h1>
              <p className="text-gray-600 mt-2">Manage video advertisements</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchAds} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Ad
              </Button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="ml-auto"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Ads</p>
                  <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Ads</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount(true)}</p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Ads</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount(false)}</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50">
                  <EyeOff className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search ads by title or placement..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <Card key={ad.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Video Preview */}
                <div className="mb-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
                  {ad.videoUrl ? (
                    <div className="text-center w-full p-4">
                      <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700 truncate">{ad.title}</p>
                      <p className="text-xs text-gray-500 mt-1">Video Advertisement</p>
                      {ad.videoUrl.includes('http') && (
                        <p className="text-xs text-blue-500 mt-1 truncate">{ad.videoUrl}</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p>No video</p>
                    </div>
                  )}
                </div>

                {/* Ad Info */}
                <div className="space-y-3">
                  {editingAd?.id === ad.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <Input
                        value={editingAd.title}
                        onChange={(e) => setEditingAd({...editingAd, title: e.target.value})}
                        placeholder="Ad Title"
                      />
                      <Input
                        value={editingAd.videoUrl}
                        onChange={(e) => setEditingAd({...editingAd, videoUrl: e.target.value})}
                        placeholder="Video URL"
                      />
                      <Input
                        value={editingAd.linkUrl}
                        onChange={(e) => setEditingAd({...editingAd, linkUrl: e.target.value})}
                        placeholder="Link URL"
                      />
                      <select
                        value={editingAd.placement}
                        onChange={(e) => setEditingAd({...editingAd, placement: e.target.value as "home" | "other"})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="home">Home Page</option>
                        <option value="other">Other Pages</option>
                      </select>
                      <div className="flex gap-2">
                        <Button onClick={updateAd} size="sm" className="flex-1">
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={() => setEditingAd(null)} size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-900">{ad.title}</h3>
                        <Badge className={getPlacementColor(ad.placement)}>
                          {(ad.placement || 'home').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LinkIcon className="w-4 h-4" />
                        <span className="truncate text-xs">
                          {ad.linkUrl}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <Badge variant={ad.isActive ? "default" : "secondary"}>
                          {ad.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <span className="text-gray-500 text-xs">
                          {formatDate(ad.createdAt)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAdStatus(ad.id, ad.isActive)}
                          className="flex-1"
                        >
                          {ad.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {ad.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingAd(ad)}>
                              Edit Ad
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteAd(ad.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Ad
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAds.length === 0 && !loading && (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  {searchTerm 
                    ? "No ads match your search criteria." 
                    : "No ads found. Create your first ad to get started."}
                </div>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)} 
                  className="mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Ad
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Create Ad Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Ad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input 
                      placeholder="Enter ad title" 
                      value={newAd.title}
                      onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    />
                  </div>

                  {/* Upload Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Source
                    </label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={uploadMethod === "link" ? "default" : "outline"}
                        onClick={() => setUploadMethod("link")}
                        className="flex-1"
                      >
                        <Link className="w-4 h-4 mr-2" />
                        Use Link
                      </Button>
                      <Button
                        type="button"
                        variant={uploadMethod === "file" ? "default" : "outline"}
                        onClick={() => setUploadMethod("file")}
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  </div>

                  {uploadMethod === "link" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video URL *
                      </label>
                      <Input 
                        placeholder="https://example.com/video.mp4" 
                        value={newAd.videoUrl}
                        onChange={(e) => setNewAd({...newAd, videoUrl: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video File *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {selectedFile ? selectedFile.name : "Click to upload video"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            MP4, WebM, MOV files accepted
                          </p>
                        </label>
                      </div>
                      {selectedFile && (
                        <p className="text-xs text-green-600 mt-1">
                          File selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link URL
                    </label>
                    <Input 
                      placeholder="https://example.com" 
                      value={newAd.linkUrl}
                      onChange={(e) => setNewAd({...newAd, linkUrl: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Placement
                    </label>
                    <select 
                      value={newAd.placement}
                      onChange={(e) => setNewAd({...newAd, placement: e.target.value as "home" | "other"})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="home">Home Page</option>
                      <option value="other">Other Pages</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newAd.isActive}
                      onChange={(e) => setNewAd({...newAd, isActive: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Activate this ad immediately
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setIsCreateModalOpen(false)
                      setNewAd({
                        title: "",
                        videoUrl: "",
                        linkUrl: "",
                        placement: "home",
                        isActive: true
                      })
                      setSelectedFile(null)
                      setUploadMethod("link")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={createAd} className="flex-1">
                    Create Ad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}