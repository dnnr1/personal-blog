"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
      className="relative w-14 h-8 rounded-full flex items-center px-1 cursor-pointer border-2 border-transparent transition-colors duration-300 bg-dark-background dark:border-smooth-orange dark:shadow-[0_0_10px_2px_#f97316]"
    >
      <span className="absolute text-white text-xs right-2 transition-all duration-300 ease-in-out opacity-100 scale-100 dark:opacity-0 dark:scale-75">
        <MoonIcon />
      </span>
      <span className="absolute text-white text-xs left-2 transition-all duration-300 ease-in-out opacity-0 scale-75 dark:opacity-100 dark:scale-100">
        <SunIcon />
      </span>
      <span className="w-5 h-5 rounded-full bg-white transition-transform duration-300 ease-in-out transform translate-x-0 dark:translate-x-6" />
    </button>
  );
}
