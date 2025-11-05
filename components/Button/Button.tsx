"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  text: string;
  href?: string;
  onClick?: () => void;
  isLogout?: boolean;
};

export default function Button({ text, href, onClick, isLogout }: Props) {
  const router = useRouter();
  return (
    <button
      className="text-sm border-1 py-1 px-2 rounded cursor-pointer"
      onClick={() => {
        if (isLogout) {
          signOut();
          return;
        }
        if (onClick) {
          onClick();
        }
        if (href) {
          router.push(href);
        }
      }}
    >
      {text}
    </button>
  );
}
