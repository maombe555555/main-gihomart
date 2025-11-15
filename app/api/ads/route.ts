import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ad from "@/models/Ad";
import { writeFile } from "fs/promises";
import path from "path";

// ----------------------------
// Type for Lean Ad documents
// NOTE: Added filePath to the file object
// ----------------------------
type AdLeanType = {
  _id: any;
  title?: string | null;
  placement?: string | null;
  videoUrl?: string | null;
  file?: { fileName: string; fileType: string; fileSize: number; filePath: string } | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  [key: string]: any;
};

// ==============================
// GET ALL ADS (No Change)
// ==============================
export async function GET(req: Request) {
  // ... (Your existing GET function remains unchanged)
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
    // Cast as a Web API File
    const videoFile = form.get("video") as File | null; 

    if (!title || !placement) {
      return NextResponse.json(
        { error: "Missing required fields: title and placement" },
        { status: 400 }
      );
    }

    let fileInfo: { fileName: string; fileType: string; fileSize: number; filePath: string } | null = null;
    let finalVideoUrl: string | null = videoUrl;

    // Validate videoUrl or videoFile presence
    if (!finalVideoUrl && !videoFile) {
      return NextResponse.json(
        { error: "Either videoUrl or video file must be provided" },
        { status: 400 }
      );
    }

    if (videoFile) {
      // --- 🛑 CRITICAL FIX: Consume the file stream and save it ---
      // 1. Read the file stream into a Buffer
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // 2. Define the path where the file will be saved
      const uploadDir = path.join(process.cwd(), "public/uploads/ads");
      // Create unique file name to prevent conflicts
      const fileName = `${Date.now()}-${videoFile.name.replace(/\s/g, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      
      // 3. Save the file to the local disk (synchronous I/O is blocked by default)
      // This step can fail if the file is very large or if 'public/uploads/ads' doesn't exist.
      await writeFile(filePath, buffer); 

      // 4. Store file info and the public URL
      fileInfo = {
        fileName: videoFile.name,
        fileType: videoFile.type,
        fileSize: videoFile.size,
         // The URL accessible from the client will be /uploads/ads/filename
         filePath: `/uploads/ads/${fileName}`, 
      };
      
      // Set the final video URL to the local path for consistency
      finalVideoUrl = fileInfo.filePath;
    }

    const adData = {
      title,
      placement,
      videoUrl: finalVideoUrl,
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
    // Return 500 status for unexpected server errors
    return NextResponse.json(
      { error: error.message || "Internal Server Error during ad creation." },
      { status: 500 } // Changed status from 400 to 500 for general server errors
    );
  }
}