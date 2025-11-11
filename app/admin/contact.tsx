"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type ContactMessage = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function fetchMessages() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/contact", { cache: "no-store" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load messages")
      setMessages(data.messages || [])
    } catch (e: any) {
      setError(e.message || "Error loading messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  async function deleteMessage(id: string) {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to delete message")
      await fetchMessages()
    } catch (e: any) {
      setError(e.message || "Error deleting message")
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>View and manage messages submitted via the Contact Us form</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-600">No messages found.</p>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg._id} className="border rounded-md p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{msg.subject}</p>
                      <p className="text-sm text-gray-500">
                        From: {msg.firstName} {msg.lastName} ({msg.email})
                        {msg.phone && ` • ${msg.phone}`} •{" "}
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="destructive" onClick={() => deleteMessage(msg._id)}>
                      Delete
                    </Button>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
