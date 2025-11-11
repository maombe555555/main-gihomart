import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Documentation from "@/models/Documentation"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

// GET: fetch all or one by ID
export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

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

    const contentType = req.headers.get("content-type") || ""
    let title = "", content = "", author = "", category = ""
    let pdfUrl = "", imageUrl = "", videoUrl = ""

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

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

      const saveFile = async (file: File) => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${uuidv4()}-${file.name}`
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)
        return `/uploads/${filename}`
      }

      if (pdfFile && pdfFile.type === "application/pdf") {
        pdfUrl = await saveFile(pdfFile)
      } else if (pdfFile) {
        return NextResponse.json({ error: "Only PDF files are allowed." }, { status: 400 })
      }

      if (imageFile && imageFile.type.startsWith("image/")) {
        imageUrl = await saveFile(imageFile)
      }

      if (videoFile && videoFile.type.startsWith("video/")) {
        videoUrl = await saveFile(videoFile)
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

// PUT: update document by ID
export async function PUT(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing documentation ID." }, { status: 400 })

    const contentType = req.headers.get("content-type") || ""
    let title = "", content = "", author = "", category = ""
    let pdfUrl = "", imageUrl = "", videoUrl = ""

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      title = formData.get("title")?.toString().trim() || ""
      content = formData.get("content")?.toString().trim() || ""
      author = formData.get("author")?.toString().trim() || ""
      category = formData.get("category")?.toString().trim() || ""

      const pdfFile = formData.get("pdf") as File | null
      const imageFile = formData.get("image") as File | null
      const videoFile = formData.get("video") as File | null

      const doc = await Documentation.findById(id)
      if (!doc) return NextResponse.json({ error: "Document not found." }, { status: 404 })

      const saveFile = async (file: File, oldUrl?: string) => {
        if (oldUrl) {
          const oldPath = path.join(process.cwd(), "public", oldUrl)
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${uuidv4()}-${file.name}`
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)
        return `/uploads/${filename}`
      }

      if (pdfFile && pdfFile.type === "application/pdf") {
        pdfUrl = await saveFile(pdfFile, doc.pdfUrl)
      }

      if (imageFile && imageFile.type.startsWith("image/")) {
        imageUrl = await saveFile(imageFile, doc.imageUrl)
      }

      if (videoFile && videoFile.type.startsWith("video/")) {
        videoUrl = await saveFile(videoFile, doc.videoUrl)
      }

      const updated = await Documentation.findByIdAndUpdate(
        id,
        {
          title,
          content,
          author,
          category,
          pdfUrl: pdfUrl || doc.pdfUrl,
          imageUrl: imageUrl || doc.imageUrl,
          videoUrl: videoUrl || doc.videoUrl,
        },
        { new: true }
      )

      return NextResponse.json(updated)
    } else {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 })
    }
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ error: "Failed to update documentation." }, { status: 500 })
  }
}

// DELETE: remove document and files
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing documentation ID." }, { status: 400 })

    const doc = await Documentation.findByIdAndDelete(id)
    if (!doc) return NextResponse.json({ error: "Documentation not found." }, { status: 404 })

    const filePaths = [doc.pdfUrl, doc.imageUrl, doc.videoUrl]
      .filter(Boolean)
      .map(url => path.join(process.cwd(), "public", url))

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    return NextResponse.json({ message: "Documentation deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete documentation." }, { status: 500 })
  }
}
