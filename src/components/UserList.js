"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";


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
    <div className="p-4 space-y-4">
      {users.map((user) => (
        <div key={user._id} className="flex items-center gap-4 border-b pb-2">
          <img
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-medium">{user.name}</span>
          <span className="text-lg font-medium">"hi2hipehpidh"{user.id}</span>
          <button
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleClick(user.id, session?.user?.providerAccountId)}
    >follow </button>
        </div>
      ))}
    </div>
  );
}
