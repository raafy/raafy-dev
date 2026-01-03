"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  id?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  error,
  id,
  disabled,
}: ImageUploadProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageLoaded(false);
    setImageError(true);
  };

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setImageError(false);
    setImageLoaded(false);
    if (newValue) {
      setIsLoading(true);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="url"
          id={id}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border bg-gray-900 px-4 py-3 pr-10 text-gray-100 placeholder-gray-500 transition-all duration-200",
            "focus:outline-none focus:ring-2",
            error || imageError
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-gray-800 focus:border-blue-500 focus:ring-blue-500/20",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />

        {/* Status indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading && (
            <Loader2 size={20} className="animate-spin text-gray-500" />
          )}
          {!isLoading && imageLoaded && (
            <CheckCircle2 size={20} className="text-green-500" />
          )}
          {!isLoading && imageError && value && (
            <AlertCircle size={20} className="text-red-500" />
          )}
        </div>
      </div>

      {/* Preview */}
      {value && !imageError && (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-400">
              Preview
            </p>
            {imageLoaded && (
              <span className="flex items-center gap-1 text-xs text-green-500">
                <CheckCircle2 size={12} />
                Loaded
              </span>
            )}
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800">
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized
              sizes="(min-width: 768px) 640px, 100vw"
              onLoadingComplete={handleImageLoad}
              onError={handleImageError}
              className={cn(
                "object-cover transition-opacity duration-300",
                isLoading && "opacity-50"
              )}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-gray-500" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {value && imageError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-900/50 bg-red-950/30 p-3">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-500">
              Failed to load image
            </p>
            <p className="mt-0.5 text-xs text-red-600">
              Please check the URL and try again
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
