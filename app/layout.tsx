import type { Metadata } from "next";
import ThemeProvider from "./theme-provider";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import QueryProvider from "@/components/QueryProvider";
import SessionProvider from "@/components/SessionProvider";
import { getServerAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dann's Blog",
  description: "A personal blog about programming, technology, and life.",
};

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning className={poppins.className}>
      <body className="bg-background dark:bg-dark-background text-smooth-black dark:text-white">
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Wrapper>
                <Navbar />
                {children}
              </Wrapper>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
