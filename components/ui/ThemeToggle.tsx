"use client";

import { Moon, Sun } from "lucide-react";
import { type Theme } from "@/lib/theme";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface ThemeToggleProps {
  currentTheme: Theme;
}

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      // Client-side theme toggle without server actions
      const newTheme: Theme = currentTheme === "light" ? "dark" : "light";

      // Set cookie
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000; sameSite=lax`;

      // Update DOM immediately
      document.documentElement.className = newTheme;

      // Refresh to ensure consistency
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="rounded-lg border border-gray-200 bg-white cursor-pointer p-2 text-sm font-medium text-black transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white/5"
      aria-label="Toggle theme"
    >
      {currentTheme === "light" ? (
        <span>
          <Sun size={16} strokeWidth={3} />
        </span>
      ) : (
        <span>
          <Moon size={16} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
