import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET() {
  await dbConnect()
  const products = await Product.find()
  return Response.json(products)
}

export async function POST(req: Request) {
  await dbConnect()
  const data = await req.json()
  const product = await Product.create(data)
  return Response.json(product)
} 