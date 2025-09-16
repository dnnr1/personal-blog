import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseURL = process.env.API_BASE_URL || "";

const authOptions: NextAuthOptions = {
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
          const data = await response.json();
          if (data.ok && data.status === 200) {
            const setCookie = response.headers.get("set-cookie");
            let tokenValue: string | undefined = undefined;
            if (setCookie) {
              const match = setCookie.match(/token=([^;]+)/);
              if (match) tokenValue = match[1];
            }

            const user = {
              id: data.data.id,
              name: data.data.username,
              email: data.data.email,
              token: tokenValue,
            };

            console.log(user);

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

const handler = NextAuth(authOptions);

export const getServerAuthSession = () => getServerSession(authOptions);

export { handler as GET, handler as POST };
