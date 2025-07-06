"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import React from 'react';

function Notfybar() {
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.providerAccountId) {
      console.log("happy valentine");
      return;
    }

    fetch("/api/users/requests", {
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
 const handleClick = (userId, reqId) => {
    console.log("Follow button clicked for user:", userId, "with request ID:", reqId);
    fetch("/api/follow", {
      method: "PUT",
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
    <div>
      <h1>Notification bar</h1>
      <div className="notification bg-gray-500 p-4 rounded-lg shadow-md mb-4"> 
        {userData ? (
          userData.requests.length === 0 ? (
            <p className="text-gray-300">No requests yet.</p>
          ) : (
            userData.requests.map((reqUser) => (
              <div
                key={reqUser._id}
                className="flex items-center gap-4 border p-3 rounded-md bg-white"
              >
                <img
                  src={reqUser.image || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-md font-medium">{reqUser.name}hello{reqUser.id}</span>
                <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() =>  handleClick(session?.user?.providerAccountId,reqUser.id)
                }>
                  Accept
                </button>
              </div>
            ))
          )
        ) : (
          <p className="text-gray-300">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Notfybar;
