import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Documentation from "@/models/Documentation"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

// GET all documentation entries
export async function GET() {
  try {
    await dbConnect()
    const docs = await Documentation.find().sort({ createdAt: -1 })
    return NextResponse.json(docs)
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ error: "Failed to fetch documentation." }, { status: 500 })
  }
}

// POST new documentation entry
export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const contentType = req.headers.get("content-type") || ""
    let title = ""
    let content = ""
    let author = ""
    let category = ""
    let pdfUrl = ""
    let imageUrl = ""
    let videoUrl = ""

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      title = formData.get("title")?.toString().trim() || ""
      content = formData.get("content")?.toString().trim() || ""
      author = formData.get("author")?.toString().trim() || ""
      category = formData.get("category")?.toString().trim() || ""

      const pdfFile = formData.get("pdf") as File | null
      const imageFile = formData.get("image") as File | null
      const videoFile = formData.get("video") as File | null

      if (!title || !content || !author || !category) {
        return NextResponse.json({ error: "Title, content, author, and category are required." }, { status: 400 })
      }

      if (pdfFile && pdfFile.type === "application/pdf") {
        const buffer = Buffer.from(await pdfFile.arrayBuffer())
        const filename = `${uuidv4()}-${pdfFile.name}`
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)
        pdfUrl = `/uploads/${filename}`
      } else if (pdfFile) {
        return NextResponse.json({ error: "Only PDF files are allowed." }, { status: 400 })
      }

      if (imageFile && imageFile.type.startsWith("image/")) {
        const buffer = Buffer.from(await imageFile.arrayBuffer())
        const filename = `${uuidv4()}-${imageFile.name}`
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)
        imageUrl = `/uploads/${filename}`
      }

      if (videoFile && videoFile.type.startsWith("video/")) {
        const buffer = Buffer.from(await videoFile.arrayBuffer())
        const filename = `${uuidv4()}-${videoFile.name}`
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)
        videoUrl = `/uploads/${filename}`
      }
    } else {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 })
    }

    const doc = await Documentation.create({
      title,
      content,
      author,
      category,
      pdfUrl,
      imageUrl,
      videoUrl,
    })

    return NextResponse.json(doc, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Failed to create documentation." }, { status: 500 })
  }
}

// DELETE a documentation entry by ID
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing documentation ID." }, { status: 400 })
    }

    const doc = await Documentation.findByIdAndDelete(id)

    if (!doc) {
      return NextResponse.json({ error: "Documentation not found." }, { status: 404 })
    }

    const filePaths = [doc.pdfUrl, doc.imageUrl, doc.videoUrl]
      .filter(Boolean)
      .map((url) => path.join(process.cwd(), "public", url))

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    return NextResponse.json({ message: "Documentation deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete documentation." }, { status: 500 })
  }
}
