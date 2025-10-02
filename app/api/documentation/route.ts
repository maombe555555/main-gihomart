import {dbConnect } from "@/lib/mongodb"
import Documentation from "@/models/Documentation"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const docs = await Documentation.find().sort({ createdAt: -1 })
    return NextResponse.json(docs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documentation" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const body = await req.json()
    const newDoc = await Documentation.create(body)
    return NextResponse.json(newDoc, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create documentation" }, { status: 500 })
  }
}
