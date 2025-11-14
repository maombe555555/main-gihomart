import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Ad from "@/models/Ad"

// UPDATE ad by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await req.json()

  try {
    const ad = await Ad.findByIdAndUpdate(params.id, body, { new: true }).lean()
    if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    return NextResponse.json({ ad })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

// DELETE ad by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const ad = await Ad.findByIdAndDelete(params.id).lean()
    if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
