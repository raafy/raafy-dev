"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme, type Theme } from "@/lib/theme";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface ThemeToggleProps {
  currentTheme: Theme;
}

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTheme(pathname);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="absolute top-4 right-4 cursor-pointer rounded-lg bg-white p-2 text-sm font-medium text-black drop-shadow-md transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border dark:border-white/40 dark:bg-black dark:text-white dark:hover:bg-white/5"
      aria-label="Toggle theme"
    >
      {currentTheme === "light" ? (
        <span>
          <Sun />
        </span>
      ) : (
        <span>
          <Moon />
        </span>
      )}
    </button>
  );
}
