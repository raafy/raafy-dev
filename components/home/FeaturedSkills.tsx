"use client";

import { motion } from "motion/react";
import resumeData from "@/data/resume.json";

interface FeaturedSkillsProps {
  messages: any;
}

export function FeaturedSkills({ messages: t }: FeaturedSkillsProps) {
  const featuredSkills = resumeData.skills.slice(0, 4);

  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 opacity-50 blur transition duration-300 group-hover:opacity-100 dark:from-gray-700 dark:to-gray-600" />
              <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-black">
                <h3 className="mb-4 text-lg font-semibold">{skill.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.keywords.slice(0, 4).map((keyword, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                  {skill.keywords.length > 4 && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-400">
                      +{skill.keywords.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
