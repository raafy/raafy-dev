"use client";
import { motion } from "motion/react";

interface GrettingsProps {
  title: string;
  heading: string;
  description: string;
}

export default function Greetings({
  title,
  heading,
  description,
}: GrettingsProps) {
  return (
    <div className="flex flex-col items-center gap-y-8 md:flex-row md:gap-x-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="font-fira-code text-8xl md:text-9xl font-bold"
      >
        {title}
      </motion.h1>
      <div className="flex flex-col items-center md:items-start">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 },
          }}
          className="text-center text-3xl font-semibold md:text-4xl"
        >
          {heading}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 0.4,
            y: 0,
            transition: { duration: 1, delay: 1 },
          }}
          className="text-center text-base md:text-xl md:text-left"
        >
          {description}
        </motion.h3>
      </div>
    </div>
  );
}
