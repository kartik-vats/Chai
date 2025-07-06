"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Notfy from "@/components/notfybar";
import Profile from "@/components/profile";
export default function profile() {
const { data: session } = useSession();
  if (session) {
    return (
      <>
    <Profile />
    <Notfy />
  </>
    );

  }
  if (!session) {
  return <p>Please sign in</p>;
}
}
