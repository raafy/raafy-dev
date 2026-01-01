"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface TranslatedSkill {
  name: string;
  level: string;
}

export function Skills({
  skills,
  translatedSkills,
}: {
  skills: Skill[];
  translatedSkills: TranslatedSkill[];
}) {
  const [expandedSkills, setExpandedSkills] = useState<Set<number>>(
    new Set([0, 1, 2])
  );

  const toggleSkill = (index: number) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSkills(newExpanded);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "advanced":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white/50 dark:border-white/20 dark:bg-white/5"
        >
          <button
            onClick={() => toggleSkill(index)}
            className="w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold md:text-lg">
                  {translatedSkills[index].name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${getLevelColor(skill.level)}`}
                >
                  {translatedSkills[index].level}
                </span>
              </div>
              <motion.svg
                animate={{ rotate: expandedSkills.has(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="opacity-50"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: expandedSkills.has(index) ? "auto" : 0,
              opacity: expandedSkills.has(index) ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 p-4 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                {skill.keywords.map((keyword, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.03,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-white/10"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
