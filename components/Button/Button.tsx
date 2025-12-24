"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = {
  text: string;
  href?: string;
  type?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
  onClick?: () => void;
  isLogout?: boolean;
  disabled?: boolean;
};

export default function Button({
  text,
  href,
  type = "button",
  onClick,
  isLogout,
  disabled,
}: Props) {
  const router = useRouter();
  return (
    <button
      className="text-sm border-1 py-1 px-2 rounded cursor-pointer"
      disabled={disabled}
      type={type}
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
