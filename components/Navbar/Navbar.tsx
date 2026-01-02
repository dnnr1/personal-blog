"use client";

import ThemeSwitch from "../ThemeSwitch";
import Button from "../Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="flex justify-between items-center py-4">
      <Link href="/" className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-orange-600 via-orange-600 to-purple-900 flex items-center justify-center">
          <span className="text-4xl font-bold text-black dark:text-white bg-background dark:bg-dark-background rounded-full w-9 h-9 flex items-center justify-center">
            D
          </span>
        </div>
        <h1 className="text-2xl font-bold text-smooth-orange pl-1">ann</h1>
      </Link>
      <div className="flex items-center gap-4">
        {user && user.id ? (
          <>
            <div className="flex items-center gap-4">
              <p className="text-sm">
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
