import NextAuth, { DefaultSession, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    address: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
