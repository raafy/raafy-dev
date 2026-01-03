"use client";

import { ReactNode } from "react";
import { AlertCircle, Info } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  id?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  id,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-100"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {hint && !error && (
        <div className="flex items-start gap-2 rounded-lg bg-blue-950/30 px-3 py-2 border border-blue-900/50">
          <Info size={16} className="mt-0.5 flex-shrink-0 text-blue-500" />
          <p className="text-sm text-blue-400">{hint}</p>
        </div>
      )}

      {children}

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-950/30 px-3 py-2 border border-red-900/50">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
