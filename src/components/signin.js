"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

function SignIn() {
  const { data: session, status } = useSession();

  // Send user data to backend when logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const sendUserDataToBackend = async () => {
        console.log("Sending user data to backend:", session.user);
        const res = await fetch("/api/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            id: session.user.providerAccountId,
            provider: session.user.provider,
            contacts: [],
            request: [],
          }),
        });
        const data = await res.json();
        console.log("User saved:", data);
      };

      sendUserDataToBackend();
    }
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "authenticated") {
    return (
      <>
        <p>Welcome, {session.user.name}</p>
        <img src={session.user.image || ""} alt="Profile" width={40} />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      <p>Not logged in</p>
      <div>
        <button onClick={() => signIn("google")}>Login with Google</button>
        <button onClick={() => signIn("github")}>Login with Github</button>
      </div>
    </>
  );
}

export default SignIn;
