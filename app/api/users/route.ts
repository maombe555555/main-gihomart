import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { z } from "zod"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const users = await User.find().select("_id email role createdAt")
    return Response.json(users)
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const body = await req.json()

    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      role: z.enum(["admin", "editor", "contributor"]).optional(),
    })

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }

    const existing = await User.findOne({ email: parsed.data.email }).select("_id")
    if (existing) {
      return Response.json({ error: "Email already in use" }, { status: 409 })
    }

    const created = await User.create(parsed.data)
    const safe = { _id: created._id, email: created.email, role: created.role, createdAt: created.createdAt }
    return Response.json(safe, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create user" }, { status: 500 })
  }
} 