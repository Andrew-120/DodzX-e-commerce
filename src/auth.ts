import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
       authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          

          const data = await res.json();
          if(!res.ok) throw new Error(data.message || "Failed to authorize");

          const decodedToken = JSON.parse(atob(data.token.split('.')[1]));

          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token
          }

        } catch (error) {
          console.error(error);
          throw new Error ((error as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
