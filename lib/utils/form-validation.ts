/**
 * Parse API error response and extract field-specific errors
 */
export function parseApiErrors(data: unknown): Record<string, string> {
  const errors: Record<string, string> = {};

  if (typeof data === "object" && data !== null && "error" in data) {
    const responseData = data as { error: string; details?: Array<{ field: string; message: string }> };
    errors.general = responseData.error;

    // Handle validation errors with details array
    if (responseData.details && Array.isArray(responseData.details)) {
      responseData.details.forEach((detail: { field: string; message: string }) => {
        if (detail.field && detail.message) {
          errors[detail.field] = detail.message;
        }
      });
    }
  }

  return errors;
}

/**
 * Check if a field has an error
 */
export function hasError(
  errors: Record<string, string>,
  field: string
): boolean {
  return !!errors[field];
}

/**
 * Get error message for a field
 */
export function getError(
  errors: Record<string, string>,
  field: string
): string | undefined {
  return errors[field];
}

/**
 * Clear specific field errors
 */
export function clearFieldErrors(
  errors: Record<string, string>,
  fields: string[]
): Record<string, string> {
  const newErrors = { ...errors };
  fields.forEach((field) => delete newErrors[field]);
  return newErrors;
}

/**
 * Simple client-side validation helpers
 */
export const validators = {
  required: (value: unknown) => {
    if (Array.isArray(value)) {
      return value.length > 0 || "This field is required";
    }
    return Boolean(value) || "This field is required";
  },

  url: (value: string) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return "Please enter a valid URL";
    }
  },

  minLength: (min: number) => (value: string) => {
    return value.length >= min || `Must be at least ${min} characters`;
  },

  maxLength: (max: number) => (value: string) => {
    return value.length <= max || `Must be at most ${max} characters`;
  },

  arrayMinLength: (min: number) => (value: unknown) => {
    if (!Array.isArray(value)) {
      return `Must have at least ${min} items`;
    }
    return value.length >= min || `Must have at least ${min} items`;
  },
};
