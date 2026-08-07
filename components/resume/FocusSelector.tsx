"use client";

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { FOCUS_IDS, type FocusId } from "@/lib/resumeFocus";

interface FocusAreaMessages {
  label: string;
  description: string;
}

export function FocusSelector({
  focus,
  onChange,
  heading,
  description,
  areas,
  downloadLabel,
  downloadHref,
}: {
  focus: FocusId;
  onChange: (id: FocusId) => void;
  heading: string;
  description: string;
  areas: Record<FocusId, FocusAreaMessages>;
  downloadLabel: string;
  downloadHref: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="space-y-4 rounded-xl border border-gray-200 bg-white/50 p-4 dark:border-white/20 dark:bg-white/5 md:p-6"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-semibold md:text-lg">{heading}</h2>
          <p className="text-sm opacity-60">{areas[focus].description}</p>
        </div>
        <a
          href={downloadHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
        >
          <Download size={16} />
          {downloadLabel}
        </a>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={description}>
        {FOCUS_IDS.map((id) => {
          const isActive = id === focus;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-gray-200 bg-white/50 opacity-70 hover:opacity-100 dark:border-white/20 dark:bg-white/5"
              }`}
            >
              {areas[id].label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
