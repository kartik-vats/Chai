'use client';

import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSession, signIn, signOut } from "next-auth/react";
type Message = {
 chatId: string; // Chat identifier
  time: string;
  sender: string; // User name or identifier
  content: string; // Optional for compatibility with different message formats
};
type Props = {
  chatId: string;
};

let socket: Socket;

export default function ChatArea({ chatId }: Props) {
  
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
  fetch(`/api/getMessages?chatId=${chatId}`)
    .then((res) => res.json())
    .then((data) => setMessages(data));
  

    fetch('/api/socket');
  socket = io();
socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});
    socket.on('receive_message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // 👇 Join chat room once when component mounts
   
      if (session && session.user) {
        socket.emit('join_chat', {
          userId: (session.user as any)?.providerAccountId,
          chatId
        });
      }
    

  

  return () => {
    socket?.disconnect();
  };
}, [chatId, session]);

const sendMessage = () => {
    if (!input.trim() || !session || !socket) return;
 const msg = {
    chatId : chatId,
    sender: (session?.user as { providerAccountId: string }).providerAccountId,
    content: input,
    time: new Date().toLocaleTimeString(),
  };
console.log("Sending message:", msg);
  socket.emit('send_message', msg);

    setInput('');
  };
if (!chatId) return;
  return (
  <div className="p-6 border rounded-xl w-full max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 dark:text-white shadow-lg">
  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
    🗨️ Real-Time Group Chat
  </h2>

  {/* Chat Messages */}
  <div className="h-64 overflow-y-auto border rounded-md p-4 mb-4 bg-gray-50 dark:bg-gray-800 space-y-2">
    {messages.map((msg, i) => (
      <div key={i} className="text-sm">
        <span className="text-gray-400 mr-2">{msg.time}</span>
        <span className="text-gray-800 dark:text-gray-100">{msg.content}</span>
      </div>
    ))}
  </div>

  {/* Input + Send */}
  <div className="flex gap-2">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      className="flex-grow border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
      placeholder="Type a message..."
    />
    <button
      onClick={sendMessage}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Send
    </button>
  </div>
</div>


  );
}
