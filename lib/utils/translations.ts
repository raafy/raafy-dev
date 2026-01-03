import type { IProject } from "@/types/project";

export interface TranslationFields {
  title?: string;
  description?: string;
}

export type SupportedLocale = "en-US" | "ms-MY";

export const SUPPORTED_LOCALES: SupportedLocale[] = ["en-US", "ms-MY"];

export const DEFAULT_LOCALE: SupportedLocale = "en-US";

/**
 * Gets translated fields for a specific locale with fallback to default locale
 */
export function getTranslatedFields(
  translations: unknown,
  locale: string | undefined
): TranslationFields | undefined {
  if (!translations || typeof translations !== "object") {
    return undefined;
  }

  // Handle Map type (from MongoDB)
  if (translations instanceof Map) {
    const value = translations.get(locale);
    if (value && typeof value === "object") {
      return value as TranslationFields;
    }
    // Fallback to default locale
    const fallbackValue = translations.get(DEFAULT_LOCALE);
    if (fallbackValue && typeof fallbackValue === "object") {
      return fallbackValue as TranslationFields;
    }
    return undefined;
  }

  // Handle plain object
  const record = translations as Record<string, unknown>;
  if (locale) {
    const value = record[locale];
    if (value && typeof value === "object") {
      return value as TranslationFields;
    }
  }
  
  // Fallback to default locale
  const fallbackValue = record[DEFAULT_LOCALE];
  if (fallbackValue && typeof fallbackValue === "object") {
    return fallbackValue as TranslationFields;
  }
  
  return undefined;
}

/**
 * Gets the best available title for a project in the specified locale
 */
export function getProjectTitle(
  project: Pick<IProject, "title" | "translations">,
  locale: string | undefined
): string {
  const translated = getTranslatedFields(project.translations, locale);
  return translated?.title || project.title;
}

/**
 * Gets the best available description for a project in the specified locale
 */
export function getProjectDescription(
  project: Pick<IProject, "description" | "translations">,
  locale: string | undefined
): string {
  const translated = getTranslatedFields(project.translations, locale);
  return translated?.description || project.description;
}

/**
 * Applies translations to a project, preserving original fields as fallback
 */
export function applyTranslations(
  project: IProject,
  locale: string | undefined
): IProject {
  const translated = getTranslatedFields(project.translations, locale);
  
  return {
    ...project,
    title: translated?.title || project.title,
    description: translated?.description || project.description,
  };
}

/**
 * Validates and normalizes translation data
 */
export function normalizeTranslations(
  translations: unknown
): Record<string, TranslationFields> | undefined {
  if (!translations || typeof translations !== "object") {
    return undefined;
  }

  if (translations instanceof Map) {
    const result: Record<string, TranslationFields> = {};
    for (const [key, value] of translations.entries()) {
      if (typeof key === "string" && value && typeof value === "object") {
        const translation = value as TranslationFields;
        // Only include non-empty translations
        if (translation.title || translation.description) {
          result[key] = {
            title: translation.title?.trim() || undefined,
            description: translation.description?.trim() || undefined,
          };
        }
      }
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }

  const record = translations as Record<string, unknown>;
  const result: Record<string, TranslationFields> = {};
  
  for (const [key, value] of Object.entries(record)) {
    if (value && typeof value === "object") {
      const translation = value as TranslationFields;
      // Only include non-empty translations
      if (translation.title || translation.description) {
        result[key] = {
          title: translation.title?.trim() || undefined,
          description: translation.description?.trim() || undefined,
        };
      }
    }
  }
  
  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Checks if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Gets the best available locale for the user
 */
export function getBestLocale(
  preferredLocale: string | undefined,
  fallbackLocale: string = DEFAULT_LOCALE
): SupportedLocale {
  if (!preferredLocale) {
    return fallbackLocale as SupportedLocale;
  }
  
  if (isSupportedLocale(preferredLocale)) {
    return preferredLocale;
  }
  
  // Try to match by language code (e.g., "en" from "en-GB")
  const languageCode = preferredLocale.split("-")[0];
  const matchedLocale = SUPPORTED_LOCALES.find(locale => 
    locale.startsWith(languageCode)
  );
  
  return matchedLocale || (fallbackLocale as SupportedLocale);
}

// Re-export translation validation utilities for convenience
export { getTranslationStatus } from "./translation-validation";
