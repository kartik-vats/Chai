

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_ID || !GITHUB_SECRET) {
  throw new Error("Missing environment variables for authentication providers");
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  callbacks: {
  async jwt({ token, account }) {
    if (account && !token.providerAccountId) {
      token.providerAccountId = account.providerAccountId;
      token.provider = account.provider;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user && token.providerAccountId) {
      (session.user as any).providerAccountId = token.providerAccountId;
      (session.user as any).provider = token.provider;
    }
    return session;
  },
  }
});