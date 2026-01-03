"use client";

import { X, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: boolean;
  id?: string;
  disabled?: boolean;
  maxItems?: number;
}

export function MultiSelect({
  value,
  onChange,
  placeholder = "Type and press Enter to add",
  error,
  id,
  disabled,
  maxItems,
}: MultiSelectProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) {
      setInputValue("");
      return;
    }

    if (maxItems && value.length >= maxItems) {
      setInputValue("");
      return;
    }

    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeItem = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div
      className={cn(
        "flex min-h-[50px] flex-wrap gap-2 rounded-lg border bg-gray-900 p-2 transition-all duration-200",
        error
          ? "border-red-500 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/20"
          : "border-gray-800 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onClick={(e) => {
        const input = e.currentTarget.querySelector("input");
        input?.focus();
      }}
    >
      {value.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={cn(
            "group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-all",
            "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          <span className="max-w-[200px] truncate">{item}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item);
            }}
            disabled={disabled}
            className={cn(
              "rounded-sm p-0.5 transition-colors",
              "text-gray-300 hover:bg-blue-700/30 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled || (maxItems ? value.length >= maxItems : false)}
          className="min-w-[120px] flex-1 border-none bg-transparent px-2 py-1 text-gray-100 placeholder-gray-500 outline-none disabled:cursor-not-allowed"
        />
        {inputValue.trim() && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem();
            }}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900",
              "dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/15 dark:hover:text-gray-200"
            )}
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
