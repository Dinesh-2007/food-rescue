"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  compact?: boolean;
  showIcon?: boolean;
  onExpired?: () => void;
}

function getTimeRemaining(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true, totalMinutes: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const totalMinutes = Math.floor(diff / (1000 * 60));

  return { hours, minutes, seconds, expired: false, totalMinutes };
}

export function CountdownTimer({
  targetDate,
  className,
  compact = false,
  showIcon = true,
  onExpired,
}: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTime(remaining);
      if (remaining.expired) {
        clearInterval(interval);
        onExpired?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpired]);

  if (time.expired) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium", compact ? "text-xs" : "text-sm", className)}>
        {showIcon && <Clock className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")} />}
        Expired
      </span>
    );
  }

  const isUrgent = time.totalMinutes <= 60;
  const isWarning = time.totalMinutes <= 180 && !isUrgent;

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium",
          isUrgent
            ? "text-rose-600 dark:text-rose-400"
            : isWarning
            ? "text-amber-600 dark:text-amber-400"
            : "text-muted-foreground",
          isUrgent && "animate-pulse",
          className
        )}
      >
        {showIcon && <Clock className="h-3 w-3" />}
        {time.hours > 0 ? `${time.hours}h ${time.minutes}m` : `${time.minutes}m ${time.seconds}s`}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium border",
        isUrgent
          ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800"
          : isWarning
          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
          : "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800",
        isUrgent && "animate-pulse",
        className
      )}
    >
      {showIcon && <Clock className="h-3.5 w-3.5" />}
      <span className="tabular-nums">
        {time.hours > 0 && <>{String(time.hours).padStart(2, "0")}h </>}
        {String(time.minutes).padStart(2, "0")}m{" "}
        {String(time.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}

/**
 * Simple text-only countdown for inline usage.
 */
export function CountdownText({ targetDate, className }: { targetDate: string; className?: string }) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (time.expired) return <span className={cn("text-rose-600", className)}>Expired</span>;

  const isUrgent = time.totalMinutes <= 60;
  return (
    <span className={cn("tabular-nums font-medium", isUrgent ? "text-rose-600" : "text-muted-foreground", className)}>
      {time.hours > 0 ? `${time.hours}h ${time.minutes}m` : `${time.minutes}m ${time.seconds}s`}
    </span>
  );
}
