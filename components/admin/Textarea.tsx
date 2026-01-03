"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full resize-none rounded-lg border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
            : "border-gray-800 focus:border-blue-500 focus:ring-blue-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
