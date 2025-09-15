import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const products = await Product.find()
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
    const data = await req.json()
    const product = await Product.create(data)
    return Response.json(product, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create product" }, { status: 500 })
  }
} 