"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export type Theme = "light" | "dark";

export const getTheme = cache(async (): Promise<Theme> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  return theme === "dark" || theme === "light" ? theme : "light";
});

export async function toggleTheme(currentPath: string) {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get("theme")?.value;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  cookieStore.set("theme", newTheme, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  revalidatePath(currentPath);
  revalidatePath("/");
}

export async function setTheme(theme: Theme, currentPath: string) {
  const cookieStore = await cookies();

  cookieStore.set("theme", theme, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  revalidatePath(currentPath);
  revalidatePath("/");
}
