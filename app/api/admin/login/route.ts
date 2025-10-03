import { NextResponse } from "next/server"
import {dbConnect } from "@/lib/mongodb"
import Admin from "@/models/Admin"
import Notification from "@/models/Notification"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { email, password } = await req.json()

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }

    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(10)

    return NextResponse.json({
      success: true,
      notifications,
    })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
