// app/api/admin/ads/[id]/route.ts
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Ad from "@/models/Ad"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await req.json()
  const ad = await Ad.findByIdAndUpdate(params.id, body, { new: true })
  if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 })
  return NextResponse.json({ ad })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const ad = await Ad.findByIdAndDelete(params.id)
  if (!ad) return NextResponse.json({ error: "Ad not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
