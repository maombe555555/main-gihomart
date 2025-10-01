import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password, role, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ error: "User already exists" });
      const user = await User.create({ email, password, role: role || "admin", name });
      return res.status(201).json({ success: true, user: { email: user.email, role: user.role, name: user.name } });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  }
  if (req.method === "GET") {
    // List all users (admin only)
    const users = await User.find({}, "email role name createdAt");
    return res.status(200).json(users);
  }
  res.status(405).json({ error: "Method not allowed" });
}
