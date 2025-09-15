import dbConnect from "@/lib/mongodb"
import Program from "@/models/Program"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const programs = await Program.find()
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
    const data = await req.json()
    const program = await Program.create(data)
    return Response.json(program, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create program" }, { status: 500 })
  }
} 