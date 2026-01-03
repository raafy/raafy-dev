"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Loader2, FolderKanban } from "lucide-react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import type { IProject } from "@/types/project";

export default function ProjectsPage() {
  const locale = useLocale();
  const t = useTranslations("projectsList");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/projects?locale=${encodeURIComponent(locale)}`
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Get unique values for filters
  const allTechStack = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  ).sort();
  const allPlatforms = Array.from(
    new Set(projects.flatMap((p) => p.platforms))
  ).sort();
  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories))
  ).sort();

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (
      selectedTech.length > 0 &&
      !selectedTech.some((tech) => project.techStack.includes(tech))
    ) {
      return false;
    }
    if (
      selectedPlatforms.length > 0 &&
      !selectedPlatforms.some((platform) => project.platforms.includes(platform))
    ) {
      return false;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.some((category) => project.categories.includes(category))
    ) {
      return false;
    }
    return true;
  });

  const handleClearFilters = () => {
    setSelectedTech([]);
    setSelectedPlatforms([]);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-gray-900 to-gray-700 p-3 dark:from-white dark:to-gray-300">
              <FolderKanban className="h-8 w-8 text-white dark:text-black" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-gray-300 dark:to-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-white/10 dark:bg-black"
          >
            <FolderKanban className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              {t("emptyTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("emptyDescription")}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside>
              <ProjectFilters
                selectedTech={selectedTech}
                selectedPlatforms={selectedPlatforms}
                selectedCategories={selectedCategories}
                onTechChange={setSelectedTech}
                onPlatformChange={setSelectedPlatforms}
                onCategoryChange={setSelectedCategories}
                onClearFilters={handleClearFilters}
                allTechStack={allTechStack}
                allPlatforms={allPlatforms}
                allCategories={allCategories}
              />
            </aside>

            {/* Projects Grid */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("showing", {
                    shown: filteredProjects.length,
                    total: projects.length,
                  })}
                </p>
              </div>
              <ProjectGrid projects={filteredProjects} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
