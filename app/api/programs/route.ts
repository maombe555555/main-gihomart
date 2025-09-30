import dbConnect from "@/lib/mongodb"
import Program from "@/models/Program"
import { z } from "zod"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const programs = await Program.find().select("_id name description schedule createdAt")
    return Response.json(programs)
  } catch (error) {
    return Response.json({ error: "Failed to fetch programs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().optional().default(""),
      schedule: z.string().optional().default(""),
    })
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }
    const created = await Program.create(parsed.data)
    const safe = { _id: created._id, name: created.name, description: created.description, schedule: created.schedule, createdAt: created.createdAt }
    return Response.json(safe, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create program" }, { status: 500 })
  }
} 

export async function PUT(req: Request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const schema = z.object({
      _id: z.string().min(1),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      schedule: z.string().optional(),
    })
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }
    const { _id, ...update } = parsed.data
    const updated = await Program.findByIdAndUpdate(_id, update, { new: true })
    if (!updated) return Response.json({ error: "Program not found" }, { status: 404 })
    const safe = { _id: updated._id, name: updated.name, description: updated.description, schedule: updated.schedule, createdAt: updated.createdAt }
    return Response.json(safe)
  } catch (error) {
    return Response.json({ error: "Failed to update program" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const schema = z.object({ _id: z.string().min(1) })
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }
    const deleted = await Program.findByIdAndDelete(parsed.data._id)
    if (!deleted) return Response.json({ error: "Program not found" }, { status: 404 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Failed to delete program" }, { status: 500 })
  }
}