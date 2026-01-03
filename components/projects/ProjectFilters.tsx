"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectFiltersProps {
  selectedTech: string[];
  selectedPlatforms: string[];
  selectedCategories: string[];
  onTechChange: (tech: string[]) => void;
  onPlatformChange: (platforms: string[]) => void;
  onCategoryChange: (categories: string[]) => void;
  onClearFilters: () => void;
  allTechStack: string[];
  allPlatforms: string[];
  allCategories: string[];
}

export function ProjectFilters({
  selectedTech,
  selectedPlatforms,
  selectedCategories,
  onTechChange,
  onPlatformChange,
  onCategoryChange,
  onClearFilters,
  allTechStack,
  allPlatforms,
  allCategories,
}: ProjectFiltersProps) {
  const t = useTranslations("projectsFilters");
  const hasFilters =
    selectedTech.length > 0 ||
    selectedPlatforms.length > 0 ||
    selectedCategories.length > 0;

  const toggleFilter = (
    item: string,
    selected: string[],
    onChange: (items: string[]) => void
  ) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-black">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">{t("title")}</h3>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X size={14} />
            {t("clearAll")}
          </button>
        )}
      </div>

      {/* Technologies */}
      {allTechStack.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("technologies")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {allTechStack.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleFilter(tech, selectedTech, onTechChange)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  selectedTech.includes(tech)
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-white dark:to-gray-300 dark:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platforms */}
      {allPlatforms.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("platforms")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {allPlatforms.map((platform) => (
              <button
                key={platform}
                onClick={() =>
                  toggleFilter(platform, selectedPlatforms, onPlatformChange)
                }
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  selectedPlatforms.includes(platform)
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-white dark:to-gray-300 dark:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {allCategories.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("categories")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  toggleFilter(category, selectedCategories, onCategoryChange)
                }
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  selectedCategories.includes(category)
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white dark:from-white dark:to-gray-300 dark:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
