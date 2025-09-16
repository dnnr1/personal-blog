"use client";
import { useRouter } from "next/navigation";

type Props = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export default function Button({ text, href, onClick }: Props) {
  const router = useRouter();
  return (
    <button
      className="text-sm border-1 py-1 px-2 rounded cursor-pointer"
      onClick={() => {
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
