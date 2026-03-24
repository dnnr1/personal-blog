"use client";

import ThemeSwitch from "../ThemeSwitch";
import Button from "../Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="sticky top-0 z-20 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-smooth-black/10 bg-background/85 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-dark-background/85">
      <Link href="/" className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-orange-600 via-orange-600 to-purple-900 flex items-center justify-center">
          <span className="text-4xl font-bold text-black dark:text-white bg-background dark:bg-dark-background rounded-full w-9 h-9 flex items-center justify-center">
            D
          </span>
        </div>
        <h1 className="pl-1 text-2xl font-bold text-smooth-orange">ann</h1>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
        {user && user.id ? (
          <>
            <div className="flex items-center gap-3">
              <p className="text-sm text-smooth-black/80 dark:text-white/80">
                Hello, <span className="text-smooth-orange">{user?.name}</span>
              </p>
            </div>
            <Button text="New Post" href="/post/new" />
            <Button text="Logout" isLogout />
          </>
        ) : null}
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default Navbar;
