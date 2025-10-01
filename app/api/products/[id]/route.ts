import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }
  try {
    await dbConnect()
    const product = await Product.findById(params.id).select("_id name description price image createdAt")
    if (!product) return Response.json({ error: "Not found" }, { status: 404 })
    return Response.json(product)
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}


