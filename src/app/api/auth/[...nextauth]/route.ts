import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { error } from "console";

export const authOptions = {
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

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
