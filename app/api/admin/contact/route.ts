import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"

export async function GET() {
  try {
    await dbConnect()
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
