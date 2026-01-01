"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export function LocaleToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const newLocale = locale === "en-US" ? "ms-MY" : "en-US";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:bg-black dark:hover:bg-white/5"
      aria-label="Toggle language"
    >
      <span
        className={
          locale === "en-US"
            ? "text-black dark:text-white"
            : "text-gray-400 dark:text-gray-600"
        }
      >
        EN
      </span>
      <span className="text-gray-400 dark:text-gray-600">|</span>
      <span
        className={
          locale === "ms-MY"
            ? "text-black dark:text-white"
            : "text-gray-400 dark:text-gray-600"
        }
      >
        BM
      </span>
    </button>
  );
}
