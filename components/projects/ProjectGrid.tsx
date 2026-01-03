import { ProjectCard } from "./ProjectCard";
import type { IProject } from "@/types/project";
import { useTranslations } from "next-intl";

interface ProjectGridProps {
  projects: IProject[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("projectsGrid");

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-white/10 dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400">
          {t("noResults")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
}
