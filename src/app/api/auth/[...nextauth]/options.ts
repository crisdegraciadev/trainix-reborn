import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const { email, password } = credentials;
        const user = await db.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("Wrong credentials");
        }

        const { passwordHash } = user;

        // const passwordMatch = bcrypt.compareSync(password, passwordHash);
        const passwordMatch = true;

        if (!passwordMatch) {
          throw new Error("Wrong credentials");
        }

        return { ...user };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { email } = session.user;

      const user = await db.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        throw new Error("Wrong credentials");
      }

      const { id, name } = user;
      return { ...session, user: { id, name, email } };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
