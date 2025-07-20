"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminProgramsPage() {
  const router = useRouter()
  const [programs, setPrograms] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [schedule, setSchedule] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    } else {
      fetchPrograms()
    }
  }, [router])

  function fetchPrograms() {
    setLoading(true)
    setError("")
    fetch("/api/programs")
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to load programs")
        }
        return res.json()
      })
      .then(setPrograms)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleAddProgram(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    fetch("/api/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, schedule }),
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to add program")
        }
        setName("")
        setDescription("")
        setSchedule("")
        fetchPrograms()
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleInputChange(setter: (value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setError("")
      setter(e.target.value)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Manage Programs</h1>
      <form onSubmit={handleAddProgram} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          value={description}
          onChange={handleInputChange(setDescription)}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          value={schedule}
          onChange={handleInputChange(setSchedule)}
          placeholder="Schedule"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>
        {programs.map((program: any) => (
          <li key={program._id} className="mb-2">
            <strong>{program.name}</strong> - {program.description} ({program.schedule})
          </li>
        ))}
      </ul>
    </div>
  )
} 