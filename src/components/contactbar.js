"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import React from 'react';
function setActiveChat(id){
  console.log("Active chat set to user with ID:", id);
}

function contactbar() {
  const [userData, setUserData] = useState(null);
    const { data: session } = useSession();
    useEffect(() => {
      if (!session?.user?.providerAccountId) {
        console.log("happy valentine");
        return;
      }
  
      fetch("/api/users/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: session.user.providerAccountId
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => console.error("Failed to fetch requests", err));
    }, [session]);
   
 return (
  <div>
    <h1>Contact Bar</h1>

    {!userData ? (
      <p className="text-gray-400">Loading contacts...</p>
    ) : userData.contacts?.length > 0 ? (
      userData.contacts.map((contact) => (
        <button
          key={contact.user._id}
          onClick={() => contact.chat && setActiveChat(contact.chat)}
          disabled={!contact.chat}
          className={`w-full text-left px-4 py-2 ${
            !contact.chat ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          {contact.user.username || "Unnamed User"}
          {!contact.chat && (
            <span className="text-xs text-red-500 ml-2">(No chat found)</span>
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
