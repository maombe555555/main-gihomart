import { dbConnect} from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const users = await User.find().sort({ createdAt: -1 })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { email, password, role } = await req.json()

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const newUser = await User.create({ email, password, role })
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
