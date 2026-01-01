"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export function ResumeSection({
  title,
  children,
  delay = 0,
}: ResumeSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold md:text-3xl">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
