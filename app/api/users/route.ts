import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const users = await User.find()
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
    const data = await req.json()
    const user = await User.create(data)
    return Response.json(user, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create user" }, { status: 500 })
  }
} 