
"use client";
import { signIn } from "next-auth/react";
import { use } from "react";
<button onClick={() => signIn('google')}>Login with Google</button>
