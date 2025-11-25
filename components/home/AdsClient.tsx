'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdFormData {
  title: string;
  placement: string;
  videoUrl: string;
  videoFile?: File | null;
}

interface Ad {
  _id: string;
  title: string;
  placement: string;
  videoUrl?: string;
  file?: {
    fileName: string;
    fileType: string;
    fileSize: number;
    filePath: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminAdsPage() {
  // ✅ Initialize with empty strings to avoid undefined
  const [formData, setFormData] = useState<AdFormData>({
    title: '',
    placement: '',
    videoUrl: '',
    videoFile: null,
  });

  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ads');
      
      if (!response.ok) throw new Error('Failed to fetch ads');
      
      const data = await response.json();
      // ✅ Ensure ads is always an array, never undefined
      setAds(data.ads || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setAds([]); // ✅ Always set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value || '', // ✅ Always fallback to empty string
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    setFormData(prev => ({
      ...prev,
      videoFile: file,
      videoUrl: file ? '' : prev.videoUrl, // Clear URL when file is selected
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.placement.trim()) {
      alert('Title and placement are required');
      return;
    }

    if (!formData.videoUrl && !formData.videoFile) {
      alert('Please provide either a video URL or upload a video file');
      return;
    }

    try {
      setSubmitting(true);
      
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('placement', formData.placement);
      
      if (formData.videoUrl) {
        submitData.append('videoUrl', formData.videoUrl);
      }
      
      if (formData.videoFile) {
        submitData.append('video', formData.videoFile);
      }

      const response = await fetch('/api/ads', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create ad');
      }

      // Reset form with proper values
      setFormData({
        title: '',
        placement: '',
        videoUrl: '',
        videoFile: null,
      });

      await fetchAds();
      alert('Ad created successfully!');
    } catch (error: any) {
      console.error('Error creating ad:', error);
      alert(error.message || 'Failed to create ad');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading ads...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Ads</h1>
      
      {/* Create Ad Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Ad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ TITLE INPUT - Always provide value fallback */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title || ''} // ✅ Critical: Never undefined
                onChange={handleInputChange}
                placeholder="Enter ad title"
                required
              />
            </div>

            {/* ✅ PLACEMENT SELECT - Always provide value fallback */}
            <div>
              <label className="block text-sm font-medium mb-2">Placement *</label>
              <select
                name="placement"
                value={formData.placement || ''} // ✅ Critical: Never undefined
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select placement</option>
                <option value="home">Home Page</option>
                <option value="sidebar">Sidebar</option>
                <option value="popup">Popup</option>
              </select>
            </div>

            {/* ✅ VIDEO URL INPUT - Always provide value fallback */}
            <div>
              <label className="block text-sm font-medium mb-2">Video URL</label>
              <Input
                type="url"
                name="videoUrl"
                value={formData.videoUrl || ''} // ✅ Critical: Never undefined
                onChange={handleInputChange}
                placeholder="https://example.com/video.mp4"
                disabled={!!formData.videoFile}
              />
            </div>

            {/* FILE INPUT - This is uncontrolled by design */}
            <div>
              <label className="block text-sm font-medium mb-2">Or Upload Video File</label>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={!!formData.videoUrl}
              />
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Ad'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ads List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Ads ({ads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {ads.length === 0 ? (
            <p>No ads found.</p>
          ) : (
            <div className="space-y-4">
              {ads.map((ad) => (
                <div key={ad._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{ad.title || 'Untitled'}</h3> {/* ✅ Fallback */}
                  <p>Placement: {ad.placement || 'Unknown'}</p> {/* ✅ Fallback */}
                  <p>Video: {ad.videoUrl || ad.file?.fileName || 'No video'}</p> {/* ✅ Fallback */}
                  <p>Created: {new Date(ad.createdAt || Date.now()).toLocaleDateString()}</p> {/* ✅ Fallback */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}