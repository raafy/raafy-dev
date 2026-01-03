import { z } from "zod";
import type { TranslationFields } from "./translations";

export const translationFieldsSchema = z.object({
  title: z.union([z.string().max(200, "Title too long"), z.literal("")]).optional(),
  description: z
    .union([z.string().max(2000, "Description too long"), z.literal("")])
    .optional(),
});

export const projectTranslationsSchema = z
  .record(z.string(), translationFieldsSchema)
  .optional();

/**
 * Validates translation data and provides detailed error messages
 */
export function validateTranslations(
  translations: unknown,
  locales: string[]
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!translations || typeof translations !== "object") {
    return { isValid: true, errors: {} }; // Translations are optional
  }

  const record = translations as Record<string, unknown>;

  for (const locale of locales) {
    const translation = record[locale];
    
    if (!translation || typeof translation !== "object") {
      continue; // Skip missing translations
    }

    const translationRecord = translation as Record<string, unknown>;
    
    // Validate title if present
    if (translationRecord.title !== undefined) {
      if (typeof translationRecord.title !== "string") {
        errors[`translations.${locale}.title`] = "Title must be a string";
      } else if (translationRecord.title.length > 200) {
        errors[`translations.${locale}.title`] = "Title is too long (max 200 characters)";
      }
    }

    // Validate description if present
    if (translationRecord.description !== undefined) {
      if (typeof translationRecord.description !== "string") {
        errors[`translations.${locale}.description`] = "Description must be a string";
      } else if (translationRecord.description.length > 2000) {
        errors[`translations.${locale}.description`] = "Description is too long (max 2000 characters)";
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Checks if at least one translation field is provided for any locale
 */
export function hasAnyTranslation(
  translations: unknown,
  locales: string[]
): boolean {
  if (!translations || typeof translations !== "object") {
    return false;
  }

  const record = translations as Record<string, unknown>;

  for (const locale of locales) {
    const translation = record[locale];
    
    if (translation && typeof translation === "object") {
      const translationRecord = translation as Record<string, unknown>;
      
      if (
        (typeof translationRecord.title === "string" && translationRecord.title.trim() !== "") ||
        (typeof translationRecord.description === "string" && translationRecord.description.trim() !== "")
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Gets translation completion status for UI feedback
 */
export function getTranslationStatus(
  translations: unknown,
  locales: string[]
): Record<string, { hasTitle: boolean; hasDescription: boolean; isComplete: boolean }> {
  const status: Record<string, { hasTitle: boolean; hasDescription: boolean; isComplete: boolean }> = {};

  if (!translations || typeof translations !== "object") {
    // Return empty status for all locales
    for (const locale of locales) {
      status[locale] = { hasTitle: false, hasDescription: false, isComplete: false };
    }
    return status;
  }

  const record = translations as Record<string, unknown>;

  for (const locale of locales) {
    const translation = record[locale];
    
    if (translation && typeof translation === "object") {
      const translationRecord = translation as Record<string, unknown>;
      const hasTitle = typeof translationRecord.title === "string" && translationRecord.title.trim() !== "";
      const hasDescription = typeof translationRecord.description === "string" && translationRecord.description.trim() !== "";
      
      status[locale] = {
        hasTitle,
        hasDescription,
        isComplete: hasTitle && hasDescription,
      };
    } else {
      status[locale] = { hasTitle: false, hasDescription: false, isComplete: false };
    }
  }

  return status;
}
