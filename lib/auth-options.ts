import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const response = await fetch(`${baseURL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (!response.ok) {
            console.error("Login failed:", response.status);
            return null;
          }
          const data = await response.json();
          if (data.ok && data.status === 200) {
            const setCookie = response.headers.get("set-cookie");
            if (setCookie) {
              const match = setCookie.match(/token=([^;]+)/);
              if (match) {
                const token = match[1];
                const cookieStore = await cookies();
                const maxAgeMatch = setCookie.match(/Max-Age=(\d+)/i);
                const maxAge = maxAgeMatch
                  ? parseInt(maxAgeMatch[1])
                  : undefined;
                cookieStore.set({
                  name: "token",
                  value: token,
                  httpOnly: true,
                  path: "/",
                  secure: process.env.NODE_ENV === "production",
                  maxAge,
                });
              }
            }
            return {
              id: data.data.id,
              name: data.data.username,
              email: data.data.email,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
