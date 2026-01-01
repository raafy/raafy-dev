import { routing } from "@/i18n/routing";
import { getTheme } from "@/lib/theme";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Navigation } from "@/components/layouts/Navigation";
import Footer from "@/components/layouts/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { StructuredData } from "@/components/seo/StructuredData";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface LocaleLayoutProps {
  children: Readonly<React.ReactNode>;
  params: Promise<{ locale: string }>;
}

const firaCode = localFont({
  src: [
    {
      path: "../../public/fonts/FiraCode-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraCode-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraCode-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraCode-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FiraCode-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-fira-code",
});

const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-google-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const theme = await getTheme();

  return (
    <html lang={locale} className={theme}>
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.match(/theme=([^;]+)/)?.[1];if(t==='dark'||t==='light'){document.documentElement.className=t}else{document.documentElement.className=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${firaCode.variable} ${googleSans.className} flex min-h-dvh flex-col bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        <StructuredData type="person" />
        <StructuredData type="website" />
        <NextIntlClientProvider>
          <SkipLink />
          <ToastProvider />
          <Navigation theme={theme} />
          <main id="main-content" className="w-full flex-1 pt-16" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
