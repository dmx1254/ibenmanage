// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    isAdmin?: boolean;
    email?: string;
    name?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id?: string;
    isAdmin?: boolean;
    email?: string;
    name?: string;
  }
}
