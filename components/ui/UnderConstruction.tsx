"use client";

import { motion } from "motion/react";
import { Hammer, Wrench, HardHat, Sparkles } from "lucide-react";

interface UnderConstructionProps {
  messages: {
    title: string;
    subtitle: string;
    message: string;
  };
}

export function UnderConstruction({ messages: t }: UnderConstructionProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20 md:px-8">
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
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
            className="absolute left-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"
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
            className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-400/20 to-pink-600/20 blur-3xl"
          />
        </div>

        {/* Construction Icon Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Hard Hat - Center */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-6 shadow-2xl">
                <HardHat size={64} className="text-white" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Hammer - Top Left */}
            <motion.div
              animate={{
                rotate: [0, -15, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute -left-12 -top-8"
            >
              <div className="rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-3 shadow-xl dark:from-gray-200 dark:to-gray-400">
                <Hammer
                  size={32}
                  className="text-white dark:text-gray-900"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Wrench - Top Right */}
            <motion.div
              animate={{
                rotate: [0, 15, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute -right-12 -top-8"
            >
              <div className="rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-3 shadow-xl dark:from-gray-200 dark:to-gray-400">
                <Wrench
                  size={32}
                  className="text-white dark:text-gray-900"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Sparkles
                  size={16}
                  className="text-yellow-500"
                  strokeWidth={2}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
              {t.title}
            </span>
          </h1>

          <p className="text-xl font-medium text-gray-600 dark:text-gray-400 md:text-2xl">
            {t.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-2xl"
          >
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
              {t.message}
            </p>
          </motion.div>

          {/* Animated Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-12 max-w-md"
          >
            <div className="relative h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <motion.div
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
              <motion.div
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.8,
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
}
