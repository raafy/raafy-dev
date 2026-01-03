import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ErrorResponse {
  error: string;
  details?: unknown;
  timestamp?: string;
}

/**
 * Format Zod validation errors into a user-friendly format
 */
export function formatZodError(error: ZodError): {
  message: string;
  details: Array<{ field: string; message: string }>;
} {
  // Get the errors from ZodError's issues property
  const issues = (error.issues || []);
  
  if (!Array.isArray(issues) || issues.length === 0) {
    return {
      message: "Validation failed",
      details: [],
    };
  }

  const details = issues.map((err) => ({
    field: (err.path && err.path.join(".")) || "unknown",
    message: err.message,
  }));

  return {
    message: details[0]?.message || "Validation failed",
    details,
  };
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  message: string,
  status: number,
  details?: unknown
): NextResponse<ErrorResponse> {
  const response: ErrorResponse = {
    error: message,
    timestamp: new Date().toISOString(),
  };

  if (details) {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * Handle validation errors from Zod
 */
export function validationErrorResponse(
  error: ZodError
): NextResponse<ErrorResponse> {
  const formatted = formatZodError(error);

  return errorResponse(
    formatted.message,
    400,
    formatted.details.length > 1 ? formatted.details : undefined
  );
}

/**
 * Handle internal server errors
 */
export function internalErrorResponse(
  error: unknown,
  context?: string
): NextResponse<ErrorResponse> {
  // Log the full error for debugging
  console.error(
    `[${context || "Error"}]:`,
    error instanceof Error ? error.message : error
  );

  if (error instanceof Error && error.stack) {
    console.error("Stack trace:", error.stack);
  }

  // Don't expose internal error details to users in production
  const isDev = process.env.NODE_ENV === "development";
  const errorMessage =
    isDev && error instanceof Error ? error.message : "Internal server error";

  return errorResponse(errorMessage, 500);
}

/**
 * Handle not found errors
 */
export function notFoundResponse(resource: string = "Resource"): NextResponse<ErrorResponse> {
  return errorResponse(`${resource} not found`, 404);
}

/**
 * Handle MongoDB duplicate key errors
 */
export function handleMongoError(error: unknown): NextResponse<ErrorResponse> | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const err = error as {
    code?: number;
    keyPattern?: Record<string, unknown>;
    name?: string;
    errors?: Record<string, { path?: string; message?: string }>;
  };

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return errorResponse(`${field} already exists`, 409);
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((e) => ({
      field: e.path || "unknown",
      message: e.message || "Validation error",
    }));

    return errorResponse(
      "Validation failed",
      400,
      errors.length > 1 ? errors : undefined
    );
  }

  if (err.name === "CastError") {
    return errorResponse("Invalid ID format", 400);
  }

  return null;
}
