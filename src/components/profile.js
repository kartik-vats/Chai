
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function profile() {
    const { data: session } = useSession();

   




  return (

    
 <div>
  <div>
      <p>👋 Hello, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>ID: {session.user.providerAccountId}</p>
      <p>Provider: {session.user.provider}</p>
      <img src={session.user.image} width={50} alt="Profile pic" />
      <br />
      <button onClick={() => signOut()}>Logout</button>
      </div>
      
    </div>
    
  )
}

export default profile
