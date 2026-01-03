"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    // Only run on client side
    const theme = document.cookie.match(/theme=([^;]+)/)?.[1];
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.className = theme;
    }
  }, []);

  return null;
}
