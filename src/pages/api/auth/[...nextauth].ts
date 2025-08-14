import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

const providers = [];

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  );
}

if (GITHUB_ID && GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async jwt({ token, account }) {
      // Explicitly type token as any to avoid unknown errors
      const t = token as any;
      if (account) {
        t.providerAccountId = account.providerAccountId as string;
        t.provider = account.provider as string;
      }
      return t;
    },
    async session({ session, token }) {
      const t = token as any;
      if (session.user) {
        session.user.providerAccountId = t.providerAccountId;
        session.user.provider = t.provider;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
