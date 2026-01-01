"use client";

import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useLocale } from "next-intl";

interface EducationType {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  location: string;
}

export function Education({
  education,
  index,
  translatedArea,
  translatedStudyType,
}: {
  education: EducationType;
  index: number;
  translatedArea: string;
  translatedStudyType: string;
}) {
  const locale = useLocale();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { year: "numeric", month: "short" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg border border-gray-200 bg-white/50 p-6 dark:border-white/20 dark:bg-white/5"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-gray-100 p-2 dark:bg-white/10">
            <GraduationCap size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold md:text-xl">
              {translatedStudyType}
            </h3>
            <p className="font-medium opacity-80">{education.institution}</p>
            <p className="text-sm opacity-60">{translatedArea}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm opacity-60">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(education.startDate)} - {formatDate(education.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {education.location}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
