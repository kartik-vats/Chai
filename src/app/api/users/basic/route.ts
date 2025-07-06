import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // Your DB connection file
import User from '@/models/User'; // Your Mongoose model

export async function GET() {
  await connectDB();

  const users = await User.find({}, { name: 1, image: 1, id:1 }); // Pick only needed fields
  return NextResponse.json(users);
}