"use client";

import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/raafy",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/raafyshiham",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:raafyshiham@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const footerLinks = [
    { name: tNav("home"), href: "/" },
    { name: tNav("resume"), href: "/resume" },
    { name: tNav("projects"), href: "/projects" },
    { name: tNav("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 dark:border-white/10 dark:from-black dark:to-gray-950">
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 z-40 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 p-3 text-white shadow-lg transition-all hover:shadow-xl dark:from-white dark:to-gray-300 dark:text-black ${
          showScrollTop
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & About */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-fira-code text-3xl font-bold"
              >
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                  {"{R}"}
                </span>
              </motion.div>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {t("about")}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{t("location")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>{t("availability")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col space-y-3">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex cursor-pointer items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <span className="mr-2 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              {t("connect")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 transition-all hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-black">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              {t("tagline")}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row dark:text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            &copy; {year} Raafy Shiham. {t("copyright")}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
