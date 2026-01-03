"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "w-full appearance-none rounded-lg border bg-gray-900 px-4 py-3 pr-10 text-white transition-all duration-200",
            "focus:outline-none focus:ring-2",
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-gray-800 focus:border-blue-500 focus:ring-blue-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        />
      </div>
    );
  }
);

Select.displayName = "Select";
