"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 rounded-md bg-muted animate-pulse flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-4 border-t">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className={cn(
                "h-4 rounded-md bg-muted animate-pulse flex-1",
                c === 0 && "max-w-[120px]"
              )}
              style={{ animationDelay: `${(r * cols + c) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-4 w-24 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                <div className="h-7 w-16 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }} />
              </div>
              <div className="h-11 w-11 rounded-xl bg-muted animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-40 rounded-md bg-muted animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-72 rounded-xl bg-muted/50 animate-pulse flex items-end gap-2 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-muted animate-pulse rounded-t-md"
              style={{
                height: `${30 + Math.random() * 60}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TimelineSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-muted animate-pulse shrink-0" style={{ animationDelay: `${i * 100}ms` }} />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-48 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }} />
            <div className="h-3 w-32 rounded-md bg-muted animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FoodCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-28 h-28 bg-muted animate-pulse shrink-0" />
        <CardContent className="p-3 flex-1 space-y-2">
          <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
          <div className="h-3 w-20 rounded-md bg-muted animate-pulse" />
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded-md bg-muted animate-pulse" />
            <div className="h-3 w-16 rounded-md bg-muted animate-pulse" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-2xl bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-48 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl border space-y-2">
            <div className="h-4 w-20 rounded-md bg-muted animate-pulse" />
            <div className="h-6 w-16 rounded-md bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
