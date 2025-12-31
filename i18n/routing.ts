import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "ms-MY"],
  defaultLocale: "en-US",
  localeCookie: {
    name: "locale",
    maxAge: 60 * 60 * 24 * 365,
  },
  localePrefix: {
    mode: "always",
    prefixes: {
      "en-US": "/en",
      "ms-MY": "/ms",
    },
  },
});
