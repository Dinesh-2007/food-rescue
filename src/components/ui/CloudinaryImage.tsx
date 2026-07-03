"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Cloudinary URL builder ─────────────────────────────────────────────────

interface CloudinaryTransform {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
  gravity?: string;
}

function buildCloudinaryUrl(
  src: string,
  transforms: CloudinaryTransform = {}
): string {
  // Only transform if the URL is actually a Cloudinary URL
  if (!src.includes("res.cloudinary.com")) return src;

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
    gravity = "auto",
  } = transforms;

  const parts: string[] = [`f_${format}`, `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`, `g_${gravity}`);

  const transformStr = parts.join(",");

  // Insert transformation string before /upload/
  return src.replace("/upload/", `/upload/${transformStr}/`);
}

// ─── Component Props ────────────────────────────────────────────────────────

export interface CloudinaryImageProps
  extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Apply automatic Cloudinary optimizations (quality + format) */
  optimize?: boolean;
  /** Show a loading skeleton placeholder */
  showSkeleton?: boolean;
  /** CSS class for the wrapper div */
  wrapperClassName?: string;
  /** Custom fallback element when src is empty/broken */
  fallback?: React.ReactNode;
}

// ─── CloudinaryImage ────────────────────────────────────────────────────────

export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  optimize = true,
  showSkeleton = true,
  wrapperClassName,
  fallback,
  className,
  ...rest
}: CloudinaryImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const optimizedSrc = optimize
    ? buildCloudinaryUrl(src, { width, height })
    : src;

  // If no src or image errored — show fallback
  if (!src || errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          wrapperClassName
        )}
        style={{ width, height }}
      >
        {fallback ?? (
          <div className="flex flex-col items-center gap-2 opacity-40">
            <ImageIcon className="h-10 w-10" />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Loading skeleton */}
      {showSkeleton && !loaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse shimmer"
          aria-hidden
        />
      )}

      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn(
          "transition-opacity duration-500 object-cover",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        {...rest}
      />
    </div>
  );
}
