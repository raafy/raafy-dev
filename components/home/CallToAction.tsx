"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import resumeData from "@/data/resume.json";

interface CallToActionProps {
  messages: Record<string, string>;
}

export function CallToAction({ messages: t }: CallToActionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-gray-300" />

          {/* Animated orbs */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative space-y-8 p-12 text-center text-white dark:text-black">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              {t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg opacity-90"
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href={`mailto:${resumeData.basics.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition-shadow hover:shadow-xl dark:bg-black dark:text-white"
              >
                <Mail size={20} />
                {t.getInTouch}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.a>

              <Link href="/resume" className="cursor-pointer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm transition-colors hover:bg-white/20 dark:border-black/30 dark:bg-black/10 dark:hover:bg-black/20"
                >
                  {t.viewResume}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
