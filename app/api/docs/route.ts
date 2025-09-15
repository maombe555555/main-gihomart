import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from '@/lib/mongodb'
import Documentation from "@/models/Documentation";

// GET all docs
export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  try {
    await dbConnect();
    const docs = await Documentation.find();
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documentation.' }, { status: 500 });
  }
}

// POST new doc
export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  try {
    await dbConnect();
    const data = await req.json();
    if (!data.title || !data.description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }
    const doc = await Documentation.create(data);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create documentation.' }, { status: 500 });
  }
}

// PUT update doc
export async function PUT(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  try {
    await dbConnect();
    const { _id, ...update } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: 'Document ID is required.' }, { status: 400 });
    }
    const doc = await Documentation.findByIdAndUpdate(_id, update, { new: true });
    if (!doc) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update documentation.' }, { status: 500 });
  }
}

// DELETE doc
export async function DELETE(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  try {
    await dbConnect();
    const { _id } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: 'Document ID is required.' }, { status: 400 });
    }
    const deleted = await Documentation.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete documentation.' }, { status: 500 });
  }
} 