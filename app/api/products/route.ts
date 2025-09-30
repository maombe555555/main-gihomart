import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { z } from "zod"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const products = await Product.find().select("_id name description price image createdAt")
    return Response.json(products)
  } catch (error) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
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
      price: z.number().min(0),
      image: z.string().url().optional(),
    })
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }
    const created = await Product.create(parsed.data)
    const safe = { _id: created._id, name: created.name, description: created.description, price: created.price, image: created.image, createdAt: created.createdAt }
    return Response.json(safe, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create product" }, { status: 500 })
  }
} 

export async function PUT(req: Request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const body = (await req.json().catch(() => ({}))) as any
    const schema = z.object({
      min: z.number().min(0).default(25),
      max: z.number().min(0).default(35),
    })
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }
    const { min, max } = parsed.data.min <= parsed.data.max ? parsed.data : { min: 25, max: 35 }

    // Clamp all prices into [min, max]
    const result = await Product.updateMany(
      {},
      [
        {
          $set: {
            price: {
              $cond: [
                { $lt: ["$price", min] },
                min,
                {
                  $cond: [
                    { $gt: ["$price", max] },
                    max,
                    "$price",
                  ],
                },
              ],
            },
          },
        },
      ] as any
    )

    return Response.json({ matched: result.matchedCount, modified: result.modifiedCount, min, max })
  } catch (error) {
    return Response.json({ error: "Failed to update product prices" }, { status: 500 })
  }
}