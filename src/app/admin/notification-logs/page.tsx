"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { RadiusTimeline } from "@/components/radius-timeline";
import { Radio, Bell, Users, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";

const resultIcons = {
  collected: { icon: CheckCircle2, color: "text-emerald-500" },
  expired: { icon: XCircle, color: "text-rose-500" },
  pending: { icon: Clock, color: "text-amber-500" },
  cancelled: { icon: XCircle, color: "text-gray-500" },
};

export default function NotificationLogsPage() {
  const mockNotificationLogs: any[] = [];
  const totalNotified = 0;
  const avgExpansions = "0.0";
  const successCount = 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Logs</h1>
        <p className="text-muted-foreground">Track notification events and radius expansion efficiency</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/30">
              <Bell className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalNotified}</p>
              <p className="text-xs text-muted-foreground">Total Notified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/30">
              <Radio className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgExpansions}</p>
              <p className="text-xs text-muted-foreground">Avg Expansions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{successCount}/{mockNotificationLogs.length}</p>
              <p className="text-xs text-muted-foreground">Collected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30">
              <TrendingUp className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{Math.round((successCount / mockNotificationLogs.length) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs */}
      <div className="space-y-4">
        {mockNotificationLogs.map((log) => {
          const ResultIcon = resultIcons[log.collectionResult as keyof typeof resultIcons];
          return (
            <Card key={log.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Left - Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{log.donationName}</h3>
                      <StatusBadge status={log.collectionResult as "collected" | "expired" | "pending" | "cancelled"} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">by {log.donorName}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Radio className="h-3.5 w-3.5 text-sky-500" />
                        <span className="text-muted-foreground">Radius:</span>
                        <span className="font-medium">{log.initialRadius} → {log.currentRadius} km</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-sky-500" />
                        <span className="text-muted-foreground">Notified:</span>
                        <span className="font-medium">{log.usersNotified}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-sky-500" />
                        <span className="text-muted-foreground">Expansions:</span>
                        <span className="font-medium">{log.expansionCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Timeline */}
                  <div className="flex items-center justify-center">
                    <RadiusTimeline
                      compact
                      steps={log.expansionTimeline.map((e: any, i: number) => ({
                        radius: e.radius,
                        notified: e.notified,
                        status: i < log.expansionTimeline.length - 1 ? "completed" as const :
                          log.collectionResult === "collected" ? "completed" as const :
                          log.collectionResult === "pending" ? "active" as const : "completed" as const,
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
