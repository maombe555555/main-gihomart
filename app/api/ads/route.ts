import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Ad from "@/models/Ad";

// ----------------------------
// Type for Lean Ad documents
// ----------------------------
type AdLeanType = {
  _id: any;
  title?: string | null;
  placement?: string | null;
  videoUrl?: string | null;
  file?: { fileName: string; fileType: string; fileSize: number } | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  [key: string]: any;
};

// ==============================
// GET ALL ADS
// ==============================
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const placement = searchParams.get("placement");

    // Type-safe lean query
    const ads = await Ad.find(placement ? { placement } : {}).lean<AdLeanType[]>();

    const transformed = ads.map(ad => ({
      ...ad,
      _id: ad._id.toString(),
      createdAt: ad.createdAt?.toISOString() || null,
      updatedAt: ad.updatedAt?.toISOString() || null,
    }));

    return NextResponse.json({ ads: transformed });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ==============================
// CREATE NEW AD (SUPPORTS FILE UPLOAD)
// ==============================
export async function POST(req: Request) {
  try {
    await dbConnect();

    // Use formData() because you may upload a video
    const form = await req.formData();

    const title = form.get("title") as string | null;
    const placement = form.get("placement") as string | null;
    const videoUrl = form.get("videoUrl") as string | null;
    const videoFile = form.get("video") as File | null;

    if (!title || !placement) {
      return NextResponse.json(
        { error: "Missing required fields: title and placement" },
        { status: 400 }
      );
    }

    let fileInfo: { fileName: string; fileType: string; fileSize: number } | null = null;

    // Validate videoUrl or videoFile presence
    if (!videoUrl && !videoFile) {
      return NextResponse.json(
        { error: "Either videoUrl or video file must be provided" },
        { status: 400 }
      );
    }

    if (videoFile) {
      // You might want to handle file upload here (e.g., upload to cloud storage)
      // For now, just store file info metadata
      fileInfo = {
        fileName: videoFile.name,
        fileType: videoFile.type,
        fileSize: videoFile.size,
      };
    }

    const adData = {
      title,
      placement,
      videoUrl,
      file: fileInfo,
    };

    const ad = await Ad.create(adData);

    const transformed = {
      ...ad.toObject(),
      _id: ad._id.toString(),
      createdAt: ad.createdAt?.toISOString() || null,
      updatedAt: ad.updatedAt?.toISOString() || null,
    };

    return NextResponse.json({ ad: transformed });
  } catch (error: any) {
    // Log error for debugging
    console.error("POST /api/ads error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid request" },
      { status: 400 }
    );
  }
}