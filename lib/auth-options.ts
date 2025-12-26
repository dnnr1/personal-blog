import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseURL = process.env.API_BASE_URL;

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
            console.error("Login failed:", response);
            throw new Error("Error logging in");
          }
          const data = await response.json();
          if (data.ok && data.status === 200) {
            const setCookie = response.headers.get("set-cookie");
            let token: string | undefined = undefined;
            if (setCookie) {
              const match = setCookie.match(/token=([^;]+)/);
              if (match) token = match[1];
            }
            const user = {
              id: data.data.id,
              name: data.data.username,
              email: data.data.email,
              token,
            };
            return user;
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
        token.apiToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.apiToken = token.apiToken as string;
      }
      return session;
    },
  },
};
