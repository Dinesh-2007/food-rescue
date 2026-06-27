"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "sky" | "emerald" | "amber" | "rose" | "violet";
  className?: string;
}

const colorMap = {
  sky: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    icon: "text-sky-500",
    border: "border-sky-100 dark:border-sky-900/50",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: "text-emerald-500",
    border: "border-emerald-100 dark:border-emerald-900/50",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: "text-amber-500",
    border: "border-amber-100 dark:border-amber-900/50",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: "text-rose-500",
    border: "border-rose-100 dark:border-rose-900/50",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    icon: "text-violet-500",
    border: "border-violet-100 dark:border-violet-900/50",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "sky",
  className,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <Card
      className={cn(
        "overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        colors.border,
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{typeof value === "number" ? value.toLocaleString() : value}</p>
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trendUp ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {trendUp ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              colors.bg
            )}
          >
            <Icon className={cn("h-5 w-5", colors.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded-md bg-muted animate-pulse" />
            <div className="h-7 w-16 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-11 w-11 rounded-xl bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
