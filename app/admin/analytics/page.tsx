"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminAnalyticsPage() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="bg-white p-6 rounded shadow text-gray-400">
        Analytics features coming soon...
      </div>
    </div>
  )
} 