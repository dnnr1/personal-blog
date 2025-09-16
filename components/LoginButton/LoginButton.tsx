"use client";

import { usePathname } from "next/navigation";
import Button from "../Button";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/login")) return null;
  return <Button text="Login" onClick={() => signIn()} />;
}
