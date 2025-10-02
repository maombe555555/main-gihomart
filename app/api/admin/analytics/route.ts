import dbConnect from "@/lib/mongodb"
import Analytics from "@/models/Analytics"

import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const data = await Analytics.find().sort({ timestamp: -1 }).limit(10)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
