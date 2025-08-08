
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import '@/app/globals.css';
function profile() {
    const { data: session } = useSession();

   




  return (

    
<div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md text-gray-800 dark:text-white">
  <div className="flex items-center gap-4">
    <img
      src={session.user.image || "/default-avatar.png"}
      alt="Profile pic"
      className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
    />
    <div>
      <p className="text-lg font-semibold">👋 Hello, {session.user.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Email: {session.user.email}</p>
    </div>
  </div>

  <div className="mt-4 space-y-1 text-sm">
    <p className="text-gray-600 dark:text-gray-400">🆔 ID: {session.user.providerAccountId}</p>
    <p className="text-gray-600 dark:text-gray-400">🔗 Provider: {session.user.provider}</p>
  </div>

  <button
    onClick={() => signOut()}
    className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition"
  >
    Logout
  </button>
</div>

    
  )
}

export default profile
