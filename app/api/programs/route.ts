import dbConnect from "@/lib/mongodb"
import Program from "@/models/Program"

export async function GET() {
  await dbConnect()
  const programs = await Program.find()
  return Response.json(programs)
}

export async function POST(req: Request) {
  await dbConnect()
  const data = await req.json()
  const program = await Program.create(data)
  return Response.json(program)
} 