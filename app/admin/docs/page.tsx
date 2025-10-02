"use client"

import { useEffect, useState } from "react"

export default function AdminDocsPage() {
  const [docs, setDocs] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
      .then(setDocs)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleAddDoc(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    fetch("/api/docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to add doc")
        }
        setTitle("")
        setContent("")
        fetchDocs()
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleInputChange(setter: (value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul className="space-y-4">
        {docs.map((doc: any) => (
          <li key={doc._id} className="bg-white p-4 rounded shadow">
            <strong className="block text-lg">{doc.title}</strong>
            <p className="text-gray-700">{doc.content}</p>
          </li>
        ))}
        {!docs.length && !loading && <li className="text-gray-500">No documentation yet</li>}
      </ul>
    </div>
  )
}
