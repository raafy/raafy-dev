"use client";

import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface Job {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export function WorkExperience({
  job,
  index,
  translatedPosition,
  translatedHighlights,
}: {
  job: Job;
  index: number;
  translatedPosition: string;
  translatedHighlights: string[];
}) {
  const t = useTranslations("resume");
  const locale = useLocale();

  const formatDate = (dateString: string) => {
    if (!dateString) return t("present");
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { year: "numeric", month: "short" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative border-l-2 border-gray-200 pl-6 dark:border-white/20"
    >
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-gray-200 bg-white dark:border-white/20 dark:bg-black" />

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold md:text-2xl">
            {translatedPosition}
          </h3>
          <p className="text-lg font-medium opacity-80">{job.name}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm opacity-60">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(job.startDate)} - {formatDate(job.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location}
          </span>
        </div>

        <ul className="space-y-2">
          {translatedHighlights.map((highlight, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
              className="flex gap-2 text-sm leading-relaxed opacity-70 md:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
