import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const { reply } = await req.json()

    if (!reply) {
      return NextResponse.json({ error: "Reply text required" }, { status: 400 })
    }

    const message = await ContactMessage.findById(params.id)
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    // Save reply inside the document (extend schema with replies array if needed)
    message.replies = message.replies || []
    message.replies.push({ text: reply, createdAt: new Date() })
    await message.save()

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error("Error replying to contact message:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
