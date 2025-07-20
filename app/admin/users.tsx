"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminUsers() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <p className="mb-4">Here you can assign roles and manage users.</p>
      {/* Placeholder for user management UI */}
      <div className="bg-white p-6 rounded shadow text-gray-400">User management coming soon...</div>
    </div>
  )
} 