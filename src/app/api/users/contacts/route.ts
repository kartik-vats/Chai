import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // Your DB connection file
import User from '@/models/User'; // Your Mongoose model

export async function POST(req: Request) {
console.log("Received request to get user requests:");
  await connectDB();
  const body = await req.json();
  
  const { userId } = body;
  console.log("Received request to get user requests:", body);
  const sender = await User.findOne({ id: userId })
  .populate("contacts.user", "username image _id")
  .select("contacts"); 
  
  console.log(sender.contacts);
  return NextResponse.json({
  contacts: sender.contacts     
}); 
}
