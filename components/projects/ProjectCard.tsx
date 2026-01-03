import { motion } from "motion/react";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";
import type { IProject } from "@/types/project";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getProjectTitle, getProjectDescription } from "@/lib/utils/translations";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("projectCard");

  const title = getProjectTitle(project, locale);
  const description = getProjectDescription(project, locale);

  const startDate = new Date(project.startDate).toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });

  const endDate = project.endDate
    ? new Date(project.endDate).toLocaleDateString(locale, {
        month: "short",
        year: "numeric",
      })
    : t("present");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Glow effect */}
      {project.featured && (
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 opacity-50 blur transition duration-300 group-hover:opacity-100 dark:from-gray-700 dark:to-gray-600" />
      )}

      {/* Card */}
      <div className="relative h-full rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-black">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-white/5">
          <Image
            src={project.imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-yellow-900">
              <Star size={14} className="fill-yellow-900" />
              {t("featured")}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/5 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Platforms & Categories */}
          <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-medium">{t("platformsLabel")}</span>
              <span>{project.platforms.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>
                {startDate} - {endDate}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white/5"
              >
                <Github size={16} />
                {t("code")}
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg dark:from-white dark:to-gray-300 dark:text-black"
              >
                <ExternalLink size={16} />
                {t("liveDemo")}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
