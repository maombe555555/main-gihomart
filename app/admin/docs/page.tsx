"use client"

import { useEffect, useRef, useState } from "react"

export default function AdminDocsPage() {
  const [docs, setDocs] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const latestDocRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    fetchDocs()
  }, [])

  function fetchDocs() {
    setLoading(true)
    setError("")
    fetch("/api/docs")
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to load docs")
        }
        return res.json()
      })
      .then(data => {
        setDocs(data)
        setTimeout(() => {
          latestDocRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 300)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleAddDoc(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("author", author)
    formData.append("category", category)
    if (pdfFile) formData.append("pdf", pdfFile)
    if (imageFile) formData.append("image", imageFile)
    if (videoFile) formData.append("video", videoFile)

    fetch("/api/docs", {
      method: "POST",
      body: formData,
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to add doc")
        }
        setTitle("")
        setContent("")
        setAuthor("")
        setCategory("")
        setPdfFile(null)
        setImageFile(null)
        setVideoFile(null)
        fetchDocs()
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleDeleteDoc(id: string) {
    if (!confirm("Are you sure you want to delete this documentation?")) return

    setLoading(true)
    setError("")

    fetch(`/api/docs?id=${id}`, {
      method: "DELETE",
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to delete doc")
        }
        fetchDocs()
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleInputChange(setter: (value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError("")
      setter(e.target.value)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Manage Documentation</h1>
      <form onSubmit={handleAddDoc} className="mb-6 flex gap-2 flex-wrap">
        <input
          value={title}
          onChange={handleInputChange(setTitle)}
          placeholder="Title"
          className="border p-2 rounded w-full md:w-1/3"
          required
        />
        <input
          value={content}
          onChange={handleInputChange(setContent)}
          placeholder="Content"
          className="border p-2 rounded w-full md:w-1/2"
          required
        />
        <input
          value={author}
          onChange={handleInputChange(setAuthor)}
          placeholder="Author"
          className="border p-2 rounded w-full md:w-1/3"
          required
        />
        <select
          value={category}
          onChange={handleInputChange(setCategory)}
          className="border p-2 rounded w-full md:w-1/3"
          required
        >
          <option value="">Select Category</option>
          <option value="Culture">Culture</option>
          <option value="History">History</option>
          <option value="Tourism">Tourism</option>
          <option value="Health">Health</option>
          <option value="Crafts">Crafts</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Arts">Arts</option>
        </select>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setPdfFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideoFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Add
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div>Loading...</div>}

      <ul className="space-y-4">
        {docs.map((doc: any, index: number) => (
          <li
            key={doc._id}
            ref={index === 0 ? latestDocRef : null}
            className="bg-white p-4 rounded shadow"
          >
            <strong className="block text-lg">{doc.title}</strong>
            <p className="text-gray-700">{doc.content}</p>
            <p className="text-sm text-gray-500">Author: {doc.author}</p>
            <p className="text-sm text-gray-500">Category: {doc.category}</p>

            {doc.pdfUrl && (
              <iframe
                src={doc.pdfUrl}
                width="100%"
                height="400"
                className="mt-4 border rounded"
                title={`Preview of ${doc.title}`}
              />
            )}
            {doc.imageUrl && (
              <img
                src={doc.imageUrl}
                alt={`Image for ${doc.title}`}
                className="mt-4 max-w-full rounded border"
              />
            )}
            {doc.videoUrl && (
              <video
                src={doc.videoUrl}
                controls
                className="mt-4 w-full rounded border"
              />
            )}

            <button
              onClick={() => handleDeleteDoc(doc._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
        {!docs.length && !loading && <li className="text-gray-500">No documentation yet</li>}
      </ul>
    </div>
  )
}
