import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';
import { Server } from 'socket.io';

import { connectDB } from '@/lib/db'; // ✅ make sure it's correct
import Message from '@/models/Message'; // ✅ correct import path

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log('⏩ Socket already running');
    res.end();
    return;
  }

  console.log('🚀 Initializing new Socket.io server...');
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {

    console.log('✅ New client connected:', socket.id);

    
    socket.on('join_chat', ({ userId, chatId }) => {
    socket.join(chatId); // 👈 joins the user to a room named after the chat
    socket.data.userId = userId; // optional: for tracking
    console.log(`🧍 User ${userId} joined chat room ${chatId}`);
  });
    socket.on('send_message', async (msg) => {
        
      console.log('📥 Received from client:', msg); // Log received

      try {
        await connectDB();
        console.log('🔗 DB Connected');

        const saved = await Message.create(msg);
        console.log('💾 Saved message:', saved);

         io.to(msg.chatId).emit('receive_message', saved);
      } catch (err) {
        console.error('❌ Failed to save message:', err);
      }
    });
  });

  res.end();
}
