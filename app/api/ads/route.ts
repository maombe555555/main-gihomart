// app/api/admin/ads/route.ts
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Ad from "@/models/Ad"


export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const placement = searchParams.get("placement") || "home"
  const ads = await Ad.find({ placement }).sort({ createdAt: -1 })
  return NextResponse.json({ Ads: ads })
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { title, videoUrl, placement = "home", isActive = true } = await req.json()

    if (!title || !videoUrl) {
      return NextResponse.json({ error: "Title and videoUrl are required" }, { status: 400 })
    }

    const ad = await Ad.create({ title, videoUrl, placement, isActive })
    return NextResponse.json({ ad }, { status: 201 })
  } catch (error) {
    console.error("Create ad error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
export async function PUT(req: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const adId = searchParams.get("id")
    if (!adId) {
      return NextResponse.json({ error: "Missing ad ID" }, { status: 400 })
    }
    const { isActive } = await req.json()
    const ad = await Ad.findById(adId)
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    }
    ad.isActive = isActive
    await ad.save()
    return NextResponse.json({ ad })
  }
    catch (error) {
    console.error("Update ad error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

}