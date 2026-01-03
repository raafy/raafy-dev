"use client";

import { motion } from "motion/react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import resumeData from "@/data/resume.json";

interface HeroProps {
  messages: {
    badge: string;
    greeting: string;
    name: string;
    role: string;
    description: string;
    viewResume: string;
    downloadCV: string;
    code: {
      fileName: string;
      name: string;
      role: string;
      skills: string;
      passion: string;
    };
  };
}

export function Hero({ messages: t }: HeroProps) {
  const locale = useLocale();

  const handleDownloadCV = () => {
    window.open(`/api/resume/download?locale=${locale}`, "_blank");
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20 md:px-8">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-600/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-pink-400/20 to-orange-600/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-2 text-sm font-medium text-white dark:from-white dark:to-gray-300 dark:text-black">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 dark:bg-black"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white dark:bg-black"></span>
                </span>
                {t.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
              >
                {t.greeting}{" "}
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
                  {t.name}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl font-medium text-gray-600 dark:text-gray-400 md:text-2xl"
              >
                {t.role}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg"
            >
              {t.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Link href="/resume" className="cursor-pointer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-3 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl dark:from-white dark:to-gray-300 dark:text-black"
                >
                  {t.viewResume}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>

              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
              >
                <Download size={18} />
                {t.downloadCV}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-4 lg:justify-start"
            >
              {resumeData.basics.profiles.map((profile, index) => (
                <motion.a
                  key={index}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-lg bg-gray-100 p-3 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                  aria-label={profile.network}
                >
                  {profile.network === "GitHub" && <Github size={20} />}
                  {profile.network === "LinkedIn" && <Linkedin size={20} />}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Animated Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 opacity-50 blur-2xl dark:from-gray-800 dark:to-gray-700" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900">
                {/* Code Editor Header */}
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-gray-800">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                    {t.code.fileName}
                  </span>
                </div>

                {/* Code Content */}
                <div className="space-y-2 p-6 font-mono text-sm">
                  <AnimatedCodeLine delay={0.6}>
                    <span className="text-purple-600 dark:text-purple-400">
                      const
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      developer
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">=</span>{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">
                      {"{"}
                    </span>
                  </AnimatedCodeLine>

                  <AnimatedCodeLine delay={0.7}>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">
                      name:
                    </span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      &apos;{t.code.name}&apos;
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </AnimatedCodeLine>

                  <AnimatedCodeLine delay={0.8}>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">
                      role:
                    </span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      &apos;{t.code.role}&apos;
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </AnimatedCodeLine>

                  <AnimatedCodeLine delay={0.9}>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">
                      skills:
                    </span>{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">
                      [
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      &apos;{t.code.skills}&apos;
                    </span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      ]
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </AnimatedCodeLine>

                  <AnimatedCodeLine delay={1.0}>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">
                      passion:
                    </span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      &apos;{t.code.passion}&apos;
                    </span>
                  </AnimatedCodeLine>

                  <AnimatedCodeLine delay={1.1}>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      {"}"}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400">
                      ;
                    </span>
                  </AnimatedCodeLine>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCodeLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}
