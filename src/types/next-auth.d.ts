import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      providerAccountId?: string;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    providerAccountId?: string;
    provider?: string;
  }
}
