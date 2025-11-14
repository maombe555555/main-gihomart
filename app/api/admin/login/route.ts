import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User"; 
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { success: false, error: "Admin not found" },
      { status: 401 }
    );
  }

  // If passwords are hashed in DB
  let isMatch = false;
  if (user.password.startsWith("$2")) {
    // bcrypt hash starts with $2...
    isMatch = await bcrypt.compare(password, user.password);
  } else {
    // plain text fallback
    isMatch = password === user.password;
  }

  if (!isMatch) {
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: { email: user.email, role: user.role },
  });
}

export async function GET() {
  return NextResponse.json({ message: "Admin login API is working" });
}
