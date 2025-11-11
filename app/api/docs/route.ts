import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Documentation from "@/models/Documentation"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

// Utility to save uploaded files
async function saveFile(file: File, folder: string, oldUrl?: string) {
  const uploadDir = path.join(process.cwd(), "public", folder)
  if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

  if (oldUrl) {
    const oldPath = path.join(process.cwd(), "public", oldUrl)
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}-${file.name}`
  const filePath = path.join(uploadDir, filename)
  await writeFile(filePath, buffer)
  return `/${folder}/${filename}`
}

// GET: fetch all or one by ID
export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const id = new URL(req.url).searchParams.get("id")
    if (id) {
      const doc = await Documentation.findById(id)
      if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 })
      return NextResponse.json(doc)
    }
    const docs = await Documentation.find().sort({ createdAt: -1 })
    return NextResponse.json(docs)
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ error: "Failed to fetch documentation." }, { status: 500 })
  }
}

// POST: create new document
export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()
    const title = formData.get("title")?.toString().trim() || ""
    const content = formData.get("content")?.toString().trim() || ""
    const author = formData.get("author")?.toString().trim() || ""
    const category = formData.get("category")?.toString().trim() || ""

    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    const pdfFile = formData.get("pdf") as File | null
    const imageFile = formData.get("image") as File | null
    const videoFile = formData.get("video") as File | null

    const pdfUrl = pdfFile?.type === "application/pdf" ? await saveFile(pdfFile, "uploads") : ""
    const imageUrl = imageFile?.type.startsWith("image/") ? await saveFile(imageFile, "uploads") : ""
    const videoUrl = videoFile?.type.startsWith("video/") ? await saveFile(videoFile, "uploads") : ""

    const doc = await Documentation.create({ title, content, author, category, pdfUrl, imageUrl, videoUrl })
    return NextResponse.json(doc, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Failed to create documentation." }, { status: 500 })
  }
}

// PUT: update document by ID
export async function PUT(req: NextRequest) {
  try {
    await dbConnect()
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing ID." }, { status: 400 })

    const formData = await req.formData()
    const title = formData.get("title")?.toString().trim() || ""
    const content = formData.get("content")?.toString().trim() || ""
    const author = formData.get("author")?.toString().trim() || ""
    const category = formData.get("category")?.toString().trim() || ""

    const doc = await Documentation.findById(id)
    if (!doc) return NextResponse.json({ error: "Document not found." }, { status: 404 })

    const pdfFile = formData.get("pdf") as File | null
    const imageFile = formData.get("image") as File | null
    const videoFile = formData.get("video") as File | null

    const pdfUrl = pdfFile?.type === "application/pdf" ? await saveFile(pdfFile, "uploads", doc.pdfUrl) : doc.pdfUrl
    const imageUrl = imageFile?.type.startsWith("image/") ? await saveFile(imageFile, "uploads", doc.imageUrl) : doc.imageUrl
    const videoUrl = videoFile?.type.startsWith("video/") ? await saveFile(videoFile, "uploads", doc.videoUrl) : doc.videoUrl

    const updated = await Documentation.findByIdAndUpdate(id, {
      title, content, author, category, pdfUrl, imageUrl, videoUrl,
    }, { new: true })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ error: "Failed to update documentation." }, { status: 500 })
  }
}

// DELETE: remove document and files
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect()
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing ID." }, { status: 400 })

    const doc = await Documentation.findByIdAndDelete(id)
    if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 })

    const filePaths = [doc.pdfUrl, doc.imageUrl, doc.videoUrl]
      .filter(Boolean)
      .map(url => path.join(process.cwd(), "public", url))

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    return NextResponse.json({ message: "Deleted successfully." })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete documentation." }, { status: 500 })
  }
}
