"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AnalyticsData {
  pageViews: number
  userCount: number
  timestamp: string
}

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    } else {
      fetch("/api/admin/analytics")
        .then(res => res.json())
        .then((data: AnalyticsData[]) => setAnalytics(data))
        .catch(err => console.error("Error fetching analytics:", err))
    }
  }, [router])

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="bg-white p-6 rounded shadow text-gray-700">
        {analytics.length > 0 ? (
          <ul className="space-y-2">
            {analytics.map((item, index) => (
              <li key={index}>
                <strong>{new Date(item.timestamp).toLocaleString()}</strong>: {item.pageViews} views, {item.userCount} users
              </li>
            ))}
          </ul>
        ) : (
          "Loading analytics..."
        )}
      </div>
    </div>
  )
}
