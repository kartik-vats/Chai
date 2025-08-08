import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose'; // ✅ import for ObjectId

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }

  try {
    await connectDB();
    console.log('🔗 DB Connected');
    console.log('📥 Fetching messages for chatId:', chatId);
    // ✅ Convert string to ObjectId
    const objectId = new mongoose.Types.ObjectId(chatId);
console.log('📤 Messages count:');
    const messages = await Message.find({ chatId: objectId })
      .sort({ createdAt: 1 })
      .select('content sender time');
console.log('📤 Messages fetched:', messages);
console.log('📤 Messages count:');
    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error('❌ Failed to fetch messages:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
