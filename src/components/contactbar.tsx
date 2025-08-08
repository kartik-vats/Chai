"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import React from 'react';
import { useRouter } from 'next/navigation';



type Contact = {
  user: {
     _id: string;
    image: string;
    name: string;
   
  };
  chat: string;
};

type UserData = {
  contacts: Contact[];
};

function contactbar() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session } = useSession();
    useEffect(() => {
      const providerAccountId = (session?.user as { providerAccountId?: string })?.providerAccountId;
      if (!providerAccountId) {
        console.log("happy valentine");
        return;
      }
  
      fetch("/api/users/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: providerAccountId
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => console.error("Failed to fetch requests", err));
    }, [session]);
   const handleClick = (chatId: any) => {
   console.log("Navigating to chat with ID:", chatId);
    router.push(`/chatarea/${chatId}`); // 🚀 Navigate to chat page
  };
 return (
 <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md max-w-md mx-auto space-y-4">
  <h1 className="text-2xl font-bold mb-4 text-blue-400">Contacts</h1>

  {!userData ? (
    <p className="text-gray-400">Loading contacts...</p>
  ) : userData.contacts?.length > 0 ? (
    userData.contacts.map((contact) => (
      <button
        key={contact.user._id}
        onClick={() => handleClick(contact.chat)}
        disabled={!contact.chat}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition 
          ${
            contact.chat
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-800 opacity-60 cursor-not-allowed"
          }`}
      >
        <div className="flex items-center gap-3">
          <img
            src={contact.user.image || "/default-avatar.png"}
            alt={contact.user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
          <div className="flex flex-col text-left">
            <span className="font-medium">{contact.user.name || "Unnamed User"}</span>
            {!contact.chat && (
              <span className="text-xs text-red-400">(No chat available)</span>
            )}
          </div>
        </div>

        {contact.chat && (
          <span className="text-xs text-gray-400">{contact.chat.slice(0, 8)}...</span>
        )}
      </button>
    ))
  ) : (
    <p className="text-sm text-gray-500">No contacts yet.</p>
  )}
</div>

);
}

export default contactbar
