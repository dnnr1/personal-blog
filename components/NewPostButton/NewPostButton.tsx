"use client";
import { usePathname } from "next/navigation";
import Button from "../Button";

export default function NewPostButton() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/post/new")) return null;
  return <Button text="New post" href="/post/new" />;
}
