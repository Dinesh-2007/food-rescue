"use client";

import { cn } from "@/lib/utils";
import { Radio, Wifi, CheckCircle2 } from "lucide-react";

interface RadiusStep {
  radius: number;
  time?: string;
  notified?: number;
  status?: "completed" | "active" | "pending";
}

interface RadiusTimelineProps {
  steps: RadiusStep[];
  className?: string;
  compact?: boolean;
}

const defaultSteps: RadiusStep[] = [
  { radius: 5, status: "completed" },
  { radius: 8, status: "completed" },
  { radius: 12, status: "active" },
  { radius: 20, status: "pending" },
];

export function RadiusTimeline({ steps = defaultSteps, className, compact = false }: RadiusTimelineProps) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          {/* Step */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex items-center justify-center rounded-full border-2 transition-all",
                compact ? "h-8 w-8" : "h-10 w-10",
                step.status === "completed"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : step.status === "active"
                  ? "bg-sky-50 border-sky-500 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400 animate-pulse-slow"
                  : "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}
            >
              {step.status === "completed" ? (
                <CheckCircle2 className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
              ) : step.status === "active" ? (
                <Wifi className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
              ) : (
                <Radio className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
              )}
            </div>
            <span
              className={cn(
                "font-semibold whitespace-nowrap",
                compact ? "text-[10px]" : "text-xs",
                step.status === "active" ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground"
              )}
            >
              {step.radius} km
            </span>
            {!compact && step.notified !== undefined && (
              <span className="text-[10px] text-muted-foreground">{step.notified} notified</span>
            )}
            {!compact && step.time && (
              <span className="text-[10px] text-muted-foreground">{step.time}</span>
            )}
          </div>
          {/* Connector */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 transition-all",
                compact ? "w-6 mx-1" : "w-10 mx-2",
                step.status === "completed"
                  ? "bg-emerald-400"
                  : step.status === "active"
                  ? "bg-sky-400"
                  : "bg-muted-foreground/20"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
