import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { env } from "@config/env";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      //Any cuz I am sending a custom body to control errors.
      async authorize(credentials): Promise<any> {
        try {
          const res = await axios.post(
            `${env.NEXT_PUBLIC_API_URL_BACKEND}/auth/login`,
            { email: credentials.email, password: credentials.password }
          );

          const user = res.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.status);
        }
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: env.AUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session = token as any;
      return session;
    },
    async redirect({ url }) {
      if (url) {
        return url;
      }
    },
  },

  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
