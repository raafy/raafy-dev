"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { MultiSelect } from "./MultiSelect";
import { ImageUpload } from "./ImageUpload";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { parseApiErrors, hasError, getError } from "@/lib/utils/form-validation";
import { normalizeTranslations, type SupportedLocale, getTranslationStatus } from "@/lib/utils/translations";
import { validateTranslations } from "@/lib/utils/translation-validation";
import type { IProject } from "@/types/project";

interface ProjectFormProps {
  project?: IProject;
  isEditing?: boolean;
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  type TranslationFields = { title: string; description: string };

  const translationLocales: Array<{ locale: SupportedLocale; label: string }> = [
    { locale: "en-US", label: "English (en-US)" },
    { locale: "ms-MY", label: "Malay (ms-MY)" },
  ];

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    translations: Record<SupportedLocale, TranslationFields>;
    imageUrl: string;
    techStack: string[];
    platforms: string[];
    categories: string[];
    githubUrl: string;
    liveDemoUrl: string;
    startDate: string;
    endDate: string;
    featured: boolean;
    status: "active" | "archived";
    order: number;
  }>({
    title: project?.title || "",
    description: project?.description || "",
    translations: {
      "en-US": {
        title: project?.translations?.["en-US"]?.title || "",
        description: project?.translations?.["en-US"]?.description || "",
      },
      "ms-MY": {
        title: project?.translations?.["ms-MY"]?.title || "",
        description: project?.translations?.["ms-MY"]?.description || "",
      },
    },
    imageUrl: project?.imageUrl || "",
    techStack: project?.techStack || [],
    platforms: project?.platforms || [],
    categories: project?.categories || [],
    githubUrl: project?.githubUrl || "",
    liveDemoUrl: project?.liveDemoUrl || "",
    startDate: project?.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : "",
    endDate: project?.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : "",
    featured: project?.featured || false,
    status: project?.status || "active",
    order: project?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const cleanedTranslations = normalizeTranslations(formData.translations);

      const url = isEditing
        ? `/api/admin/projects/${project?._id}`
        : "/api/admin/projects";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          translations: cleanedTranslations,
          githubUrl: formData.githubUrl || undefined,
          liveDemoUrl: formData.liveDemoUrl || undefined,
          endDate: formData.endDate || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          isEditing ? "Project updated successfully" : "Project created successfully"
        );
        router.push("/admin/projects");
      } else {
        const apiErrors = parseApiErrors(data);
        setErrors(apiErrors);
        toast.error(apiErrors.general || "Failed to save project");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Invalid image URL";
    }

    if (formData.techStack.length === 0) {
      newErrors.techStack = "At least one technology is required";
    }

    if (formData.platforms.length === 0) {
      newErrors.platforms = "At least one platform is required";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "At least one category is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = "Invalid GitHub URL";
    }

    if (formData.liveDemoUrl && !isValidUrl(formData.liveDemoUrl)) {
      newErrors.liveDemoUrl = "Invalid demo URL";
    }

    // Validate translations
    const translationValidation = validateTranslations(
      formData.translations,
      translationLocales.map(tl => tl.locale)
    );
    
    if (!translationValidation.isValid) {
      Object.assign(newErrors, translationValidation.errors);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Get translation status for UI feedback
  const translationStatus = getTranslationStatus(
    formData.translations,
    translationLocales.map(tl => tl.locale)
  );

  return (
    <form onSubmit={(e) => {
      if (validateForm()) {
        handleSubmit(e);
      } else {
        e.preventDefault();
      }
    }} className="space-y-6">
      {/* General error message */}
      {errors.general && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {/* Title */}
      <FormField
        label="Title"
        required
        error={getError(errors, "title")}
        id="title"
      >
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="My Awesome Project"
          error={hasError(errors, "title")}
          disabled={isSubmitting}
        />
      </FormField>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Translations
          </p>
          <div className="flex gap-2 text-xs">
            {translationLocales.map(({ locale, label }) => {
              const status = translationStatus[locale];
              return (
                <div
                  key={locale}
                  className={`flex items-center gap-1 rounded px-2 py-1 ${
                    status.isComplete
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : status.hasTitle || status.hasDescription
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      status.isComplete
                        ? "bg-green-500"
                        : status.hasTitle || status.hasDescription
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  />
                  {label.split(" ")[0]}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-6">
          {translationLocales.map(({ locale, label }) => (
            <div key={locale} className="space-y-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Title"
                  error={getError(errors, `translations.${locale}.title`)}
                  id={`translations.${locale}.title`}
                >
                  <Input
                    id={`translations.${locale}.title`}
                    value={formData.translations[locale].title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          [locale]: {
                            ...formData.translations[locale],
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder=""
                    error={hasError(errors, `translations.${locale}.title`)}
                    disabled={isSubmitting}
                  />
                </FormField>

                <FormField
                  label="Description"
                  error={getError(errors, `translations.${locale}.description`)}
                  id={`translations.${locale}.description`}
                >
                  <Textarea
                    id={`translations.${locale}.description`}
                    value={formData.translations[locale].description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          [locale]: {
                            ...formData.translations[locale],
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder=""
                    rows={3}
                    error={hasError(errors, `translations.${locale}.description`)}
                    disabled={isSubmitting}
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <FormField
        label="Description"
        required
        error={getError(errors, "description")}
        id="description"
      >
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your project in detail..."
          rows={5}
          error={hasError(errors, "description")}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Image URL */}
      <FormField
        label="Project Image"
        required
        error={getError(errors, "imageUrl")}
        hint="Enter a direct URL to the project image (16:9 aspect ratio recommended)"
        id="imageUrl"
      >
        <ImageUpload
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(value) => setFormData({ ...formData, imageUrl: value })}
          error={hasError(errors, "imageUrl")}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Tech Stack */}
      <FormField
        label="Tech Stack"
        required
        error={getError(errors, "techStack")}
        hint="Add technologies used in this project (press Enter after each item)"
        id="techStack"
      >
        <MultiSelect
          id="techStack"
          value={formData.techStack}
          onChange={(value) => setFormData({ ...formData, techStack: value })}
          placeholder="e.g., React, TypeScript, Next.js"
          error={hasError(errors, "techStack")}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Platforms */}
      <FormField
        label="Platforms"
        required
        error={getError(errors, "platforms")}
        hint="Platforms where this project runs"
        id="platforms"
      >
        <MultiSelect
          id="platforms"
          value={formData.platforms}
          onChange={(value) => setFormData({ ...formData, platforms: value })}
          placeholder="e.g., Web, Mobile, Desktop"
          error={hasError(errors, "platforms")}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Categories */}
      <FormField
        label="Categories"
        required
        error={getError(errors, "categories")}
        hint="Project categories for filtering"
        id="categories"
      >
        <MultiSelect
          id="categories"
          value={formData.categories}
          onChange={(value) => setFormData({ ...formData, categories: value })}
          placeholder="e.g., E-commerce, SaaS, Portfolio"
          error={hasError(errors, "categories")}
          disabled={isSubmitting}
        />
      </FormField>

      {/* URLs */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="GitHub URL"
          error={getError(errors, "githubUrl")}
          hint="Link to the project's GitHub repository"
          id="githubUrl"
        >
          <Input
            id="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
            placeholder="https://github.com/username/repo"
            error={hasError(errors, "githubUrl")}
            disabled={isSubmitting}
          />
        </FormField>

        <FormField
          label="Live Demo URL"
          error={getError(errors, "liveDemoUrl")}
          hint="Link to the live/deployed project"
          id="liveDemoUrl"
        >
          <Input
            id="liveDemoUrl"
            type="url"
            value={formData.liveDemoUrl}
            onChange={(e) =>
              setFormData({ ...formData, liveDemoUrl: e.target.value })
            }
            placeholder="https://example.com"
            error={hasError(errors, "liveDemoUrl")}
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      {/* Dates */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Start Date"
          required
          error={getError(errors, "startDate")}
          id="startDate"
        >
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            error={hasError(errors, "startDate")}
            disabled={isSubmitting}
          />
        </FormField>

        <FormField
          label="End Date"
          error={getError(errors, "endDate")}
          hint="Leave empty if project is ongoing"
          id="endDate"
        >
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            error={hasError(errors, "endDate")}
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      {/* Settings */}
      <div className="grid gap-6 md:grid-cols-3">
        <FormField label="Status" id="status">
          <Select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as "active" | "archived",
              })
            }
            disabled={isSubmitting}
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </Select>
        </FormField>

        <FormField
          label="Display Order"
          error={getError(errors, "order")}
          hint="Lower numbers appear first"
          id="order"
        >
          <Input
            id="order"
            type="number"
            min="0"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
            }
            error={hasError(errors, "order")}
            disabled={isSubmitting}
          />
        </FormField>

        <div className="flex items-end">
          <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:bg-black dark:hover:border-white/30 dark:hover:bg-white/5">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              disabled={isSubmitting}
              className="h-5 w-5 rounded border-gray-800 bg-gray-900 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="text-sm font-medium text-gray-100">
              Featured Project
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              {isEditing ? "Update Project" : "Create Project"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-800 bg-gray-900 px-6 py-4 font-semibold text-gray-100 transition-colors hover:bg-gray-800 hover:border-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
