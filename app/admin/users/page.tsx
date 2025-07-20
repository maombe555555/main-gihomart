"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const ROLES = ["admin", "editor", "contributor"]

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(ROLES[2])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    } else {
      fetchUsers()
    }
  }, [router])

  function fetchUsers() {
    setLoading(true)
    setError("")
    fetch("/api/users")
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to load users")
        }
        return res.json()
      })
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to add user")
        }
        setEmail("")
        setPassword("")
        setRole(ROLES[2])
        fetchUsers()
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
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <form onSubmit={handleAddUser} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          value={email}
          onChange={handleInputChange(setEmail)}
          placeholder="Email"
          type="email"
          className="border p-2 rounded"
          required
        />
        <input
          value={password}
          onChange={handleInputChange(setPassword)}
          placeholder="Password"
          type="password"
          className="border p-2 rounded"
          required
        />
        <select
          value={role}
          onChange={handleInputChange(setRole)}
          className="border p-2 rounded"
        >
          {ROLES.map(r => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>
        {users.map((user: any) => (
          <li key={user._id} className="mb-2">
            <strong>{user.email}</strong> - {user.role}
          </li>
        ))}
      </ul>
    </div>
  )
} 