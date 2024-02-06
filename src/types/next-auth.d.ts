import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
};
