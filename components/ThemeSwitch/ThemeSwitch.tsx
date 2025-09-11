"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) return <span className="w-14" />;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300 cursor-pointer
        ${
          isDark
            ? "bg-dark-background shadow-[0_0_10px_2px_#f97316] border-smooth-orange border-2 h-8"
            : "bg-dark-background"
        }
      `}
    >
      <span
        className={`absolute text-white text-xs ${
          !isDark ? "right-2" : "left-2"
        }`}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      <span
        className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 transform
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </button>
  );
}
