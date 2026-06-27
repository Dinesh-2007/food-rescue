"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 mb-6">
        <Icon className="h-10 w-10 text-sky-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
