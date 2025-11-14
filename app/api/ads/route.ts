import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Ad from "@/models/Ad";

// GET all ads (with optional ?placement=header)
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const placement = searchParams.get("placement");

    const query = placement ? { placement } : {};

    const ads = await Ad.find(query).lean();

    // convert non-serializable fields
    const transformed = ads.map(ad => ({
      ...ad,
      _id: ad._id?.toString(),
      createdAt: ad.createdAt ? new Date(ad.createdAt).toISOString() : null,
      updatedAt: ad.updatedAt ? new Date(ad.updatedAt).toISOString() : null,
    }));

    return NextResponse.json({ ads: transformed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new ad
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const ad = await Ad.create(body);

    const transformed = {
      ...ad.toObject(),
      _id: ad._id.toString(),
      createdAt: ad.createdAt?.toISOString(),
      updatedAt: ad.updatedAt?.toISOString(),
    };

    return NextResponse.json({ ad: transformed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
