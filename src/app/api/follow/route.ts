import { NextResponse } from "next/server";
import User from "@/models/User";
import Chat from '@/models/chat';
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
    const receiver = await User.findOne({ id: userId });

    if (!sender || !receiver) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const alreadyRequested = receiver.requests.includes(sender._id);
   

    if (alreadyRequested) {
      console.log(`User ${userId} already requested follow from ${reqId}`);
      return NextResponse.json({ error: "Already requested" }, { status: 409 });
    }
const alreadyContacted = receiver.contacts.some(
  (contact: { user: mongoose.Types.ObjectId }) =>
    contact.user.toString() === sender._id.toString()
);
    if (alreadyContacted) {
      console.log(`User ${userId} already connected with ${reqId}`);
      return NextResponse.json({ error: "Already connected" }, { status: 409 });
    }
// Check if sender has already received a request from receiver
const isMutualRequest = sender.requests.includes(receiver._id);

if (isMutualRequest) {
  // Accept the request instead of sending a new one

  // 1. Remove request from sender's list
  await User.updateOne(
    { id: reqId },
    { $pull: { requests: receiver._id } }
  );
const newChat = await Chat.create({
    users: [sender._id, receiver._id],
    messages: [],
    });
  // 2. Add each other to contacts
  await User.updateOne(
    { id: userId },
    { $addToSet: { contacts: { user: sender._id, chat: newChat._id } } }
  );
  await User.updateOne(
    { id: reqId },
    { $addToSet: { contacts: { user: receiver._id, chat: newChat._id  } } }
  );

  // 3. Return accepted status
  return NextResponse.json({ success: true, message: "Request mutually accepted" });
}

    await User.updateOne(
      { id: userId },
      { $addToSet: { requests: sender._id } } // Avoid duplicates
    );

    console.log(`User ${userId} received follow request from ${reqId}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await connectDB();
   
  const body = await req.json();
  const { userId, reqId,cmd } = body;
  
  console.log("Follow button clicked for user:", userId, "with request ID:", reqId);

  if (!userId || !reqId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
    console.log("Connecting to database...");
   
 
    console.log(userId, reqId);  
    // Add the new chat to both users' contacts
    
    const sender = await User.findOne({ id: reqId });
    const receiver = await User.findOne({ id: userId });
    await User.updateOne(
      { id: userId },
      { $pull: { requests: sender._id } }
    );
    if(cmd=="reject"){
      console.log(`User ${userId} rejected request ${reqId}`);
    
      return NextResponse.json({ success: true });
    }
    const alreadyContacted = receiver.contacts.some(
      (contact: { user: mongoose.Types.ObjectId }) =>
        contact.user.toString() === sender._id.toString()
    );
    if (alreadyContacted) {
      console.log(`User ${userId} already connected with ${reqId}`);
      return NextResponse.json({ error: "Already connected" }, { status: 409 });
    }
    const newChat = await Chat.create({
      users: [sender._id, receiver._id],
      messages: [],
    });
    await User.updateOne(
      { id: userId },
      { $addToSet: {
          contacts: {
            user: sender._id,
            chat: newChat._id,
          }
        }
      }
    );
    if(userId!== reqId) {
      await User.updateOne(
        { id: reqId },
        { $addToSet: {
            contacts: {
              user: receiver._id,
              chat: newChat._id,
            }
          }
        }
      );
    }
    
    console.log(`User ${userId} followed request ${reqId}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
