import {dbConnect} from "@/lib/mongodb"
import Product from "@/models/Product"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const products = await Product.find()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const body = await req.json()
    const newProduct = await Product.create(body)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
} 
export async function DELETE(req: Request) {
  try {
    await dbConnect()
    const { id } = await req.json()
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
