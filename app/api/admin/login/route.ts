import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Admin from "@/models/Admin"
import Notification from "@/models/Notification"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  await dbConnect()

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 })
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    // Optional: Create a login notification
    await Notification.create({
      message: `Admin ${email} logged in`,
      type: "login",
      createdAt: new Date()
    })

    return NextResponse.json({ message: "Login successful", admin }, { status: 200 })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
