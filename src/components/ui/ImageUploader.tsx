"use client";

import { useState, useRef, DragEvent, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  ImageIcon,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UploadedImage {
  imageUrl: string;
  publicId: string;
}

export interface ImageUploaderProps {
  /** Called when a successful upload completes */
  onUploadSuccess: (result: UploadedImage) => void;
  /** Called when the image is cleared */
  onClear?: () => void;
  /** Optional initial image URL (e.g. when editing an existing donation) */
  initialImageUrl?: string;
  /** Optional initial public_id for deletion on replace */
  initialPublicId?: string;
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_EXT_LABEL = "JPG, JPEG, PNG, WEBP";
const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

// ─── Upload state machine ────────────────────────────────────────────────────

type UploadStatus = "idle" | "previewing" | "uploading" | "success" | "error";

// ─── Component ───────────────────────────────────────────────────────────────

export function ImageUploader({
  onUploadSuccess,
  onClear,
  initialImageUrl,
  initialPublicId,
  className,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<UploadStatus>(
    initialImageUrl ? "success" : "idle"
  );
  const [preview, setPreview] = useState<string>(initialImageUrl ?? "");
  const [publicId, setPublicId] = useState<string>(initialPublicId ?? "");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  // ─── Core upload logic ──────────────────────────────────────────────────

  const uploadFile = useCallback(
    async (file: File) => {
      // — Client-side validation —
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Invalid file type. Allowed: ${ALLOWED_EXT_LABEL}.`);
        setStatus("error");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(`File too large. Maximum size is ${MAX_MB} MB.`);
        setStatus("error");
        return;
      }

      // Show local preview immediately for snappy UX
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setStatus("uploading");
      setError("");
      setProgress(0);

      // Fake progress tick (Cloudinary doesn't stream progress)
      const ticker = setInterval(() => {
        setProgress((p) => Math.min(p + Math.random() * 12, 88));
      }, 200);

      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();

        clearInterval(ticker);

        if (!res.ok || !json.success) {
          throw new Error(json.error ?? "Upload failed.");
        }

        setProgress(100);
        setStatus("success");
        setPublicId(json.publicId);

        // Revoke the temp object URL and use the Cloudinary URL
        URL.revokeObjectURL(objectUrl);
        setPreview(json.imageUrl);

        onUploadSuccess({ imageUrl: json.imageUrl, publicId: json.publicId });
      } catch (err: unknown) {
        clearInterval(ticker);
        const message = err instanceof Error ? err.message : "Upload failed.";
        setError(message);
        setStatus("error");
        setPreview("");
      }
    },
    [onUploadSuccess]
  );

  // ─── Delete / clear ────────────────────────────────────────────────────

  const handleClear = useCallback(async () => {
    // Fire-and-forget delete (don't block the UI)
    if (publicId) {
      fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      }).catch(console.error);
    }

    setPreview("");
    setPublicId("");
    setStatus("idle");
    setProgress(0);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClear?.();
  }, [publicId, onClear]);

  // ─── Event handlers ────────────────────────────────────────────────────

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  // ─── Render ────────────────────────────────────────────────────────────

  const showPreviewArea = status === "uploading" || status === "success" || status === "error" && preview;
  const isUploading = status === "uploading";

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ── Preview area ── */}
      {showPreviewArea ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-sky-400/60 dark:border-sky-600/60 shadow-md group">
          {/* Image */}
          <div className="relative w-full h-64 bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Upload progress overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
              <p className="text-white text-sm font-semibold tracking-wide">
                Uploading to cloud…
              </p>
              {/* Progress bar */}
              <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white/70 text-xs">{Math.round(progress)}%</span>
            </div>
          )}

          {/* Success badge */}
          {status === "success" && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg z-10">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Uploaded to Cloudinary
            </div>
          )}

          {/* Remove button */}
          {!isUploading && (
            <button
              type="button"
              onClick={handleClear}
              title="Remove image"
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-rose-500 transition-colors z-10 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Change photo strip */}
          {status === "success" && (
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/90 dark:bg-black/80 text-foreground hover:bg-white rounded-lg h-8 text-xs border-0"
              >
                <RefreshCw className="h-3 w-3 mr-1.5" />
                Change Photo
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center cursor-pointer select-none min-h-[240px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
            isDragOver
              ? "border-sky-500 bg-sky-50 dark:bg-sky-950/20 scale-[1.01]"
              : "border-border hover:border-sky-400 hover:bg-accent/40"
          )}
        >
          {/* Animated cloud icon */}
          <div
            className={cn(
              "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-200",
              isDragOver
                ? "bg-sky-500 text-white scale-110"
                : "bg-sky-50 dark:bg-sky-950/40 text-sky-500"
            )}
          >
            {isDragOver ? (
              <Upload className="h-8 w-8" />
            ) : (
              <ImageIcon className="h-8 w-8" />
            )}
          </div>

          <div>
            <p className="font-semibold text-base">
              {isDragOver ? "Drop image here" : "Click or drag image here"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {ALLOWED_EXT_LABEL} · up to {MAX_MB} MB
            </p>
          </div>

          {/* Cloudinary badge */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mt-1">
            <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current opacity-50" aria-hidden>
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 2c6.617 0 12 5.383 12 12s-5.383 12-12 12S4 22.617 4 16 9.383 4 16 4zm-1 4v9.586l-3.293-3.293-1.414 1.414L16 21.414l5.707-5.707-1.414-1.414L17 17.586V8h-2z" />
            </svg>
            Securely stored on Cloudinary
          </div>
        </div>
      )}

      {/* ── Error message ── */}
      {status === "error" && error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-sm text-rose-700 dark:text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Upload failed</p>
            <p className="text-xs mt-0.5 opacity-80">{error}</p>
          </div>
          <button
            type="button"
            className="text-rose-400 hover:text-rose-600 transition-colors"
            onClick={() => { setStatus("idle"); setError(""); }}
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
