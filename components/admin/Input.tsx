"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-lg border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200",
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

Input.displayName = "Input";
