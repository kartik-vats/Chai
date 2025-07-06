import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { userId, reqId } = body;
console.log("Received request to follow user:", body);
  if (!userId || !reqId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
   const sender = await User.findOne({ id: reqId });
    await User.updateOne(
      { id: userId },
      { $addToSet: { requests: sender._id } }
       // Add reqId to requests array
    );
    console.log(`User ${userId} followed request ${reqId}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  await connectDB();

  const body = await req.json();
  const { userId, reqId } = body;
  console.log("Follow button clicked for user:", userId, "with request ID:", reqId);

  if (!userId || !reqId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
   const sender = await User.findOne({ id: reqId });
    await User.updateOne(
      { id: userId },
      { $addToSet: { contacts: sender._id } }
    );
    await User.updateOne(
    { id: userId },
    { $pull: { requests: sender._id } }
  );
    console.log(`User ${userId} followed request ${reqId}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
