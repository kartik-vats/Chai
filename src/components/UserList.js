"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import '@/app/globals.css';
export default function UserList() {
  const [users, setUsers] = useState([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    fetch("/api/users/basic")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);
   const handleClick = (userId, reqId) => {
    console.log("Follow button clicked for user:", userId, "with request ID:", session?.user?.providerAccountId);
    fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: userId,
        reqId: reqId
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Followed user:", data);
        // Optionally, you can update the UI or state here
      })
      .catch((err) => console.error("Failed to follow user", err));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 space-y-4">
  {users.map((user) => (
    <div
      key={user._id}
      className="flex items-center gap-6 p-4 bg-gray-100 rounded-xl shadow-lg"
    >
      {/* Avatar */}
      <img
        src={user.image || "/default-avatar.png"}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />

      {/* Name & ID */}
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-800">{user.name}</span>
        <span className="text-sm text-gray-600">{user.id}</span>
      </div>

      {/* Follow Button */}
      <div className="ml-auto">
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          onClick={() => handleClick(user.id, session?.user?.providerAccountId)}
        >
          Follow
        </button>
      </div>
    </div>
  ))}
</div>


  );
}
