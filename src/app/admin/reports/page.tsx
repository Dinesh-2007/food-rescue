"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockReports } from "@/lib/mock-data";
import { Flag, AlertTriangle, Ban, Trash2, CheckCircle2, Shield, Calendar, User, Package } from "lucide-react";

const filterTabs = ["All", "Spam", "Fake Donations", "Complaints", "Expired", "Inactive Users", "Suspicious"];

const typeConfig: Record<string, { color: string; icon: string }> = {
  spam: { color: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800", icon: "🚫" },
  fake_donation: { color: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 dark:border-rose-800", icon: "⚠️" },
  complaint: { color: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800", icon: "📢" },
  expired: { color: "bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400 border-gray-200 dark:border-gray-800", icon: "⏰" },
  inactive_user: { color: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-sky-200 dark:border-sky-800", icon: "💤" },
  suspicious: { color: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 dark:border-rose-800", icon: "🔍" },
};

export default function ReportsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = mockReports.filter((r) => {
    if (activeFilter === "All") return true;
    const filterMap: Record<string, string> = {
      "Spam": "spam",
      "Fake Donations": "fake_donation",
      "Complaints": "complaint",
      "Expired": "expired",
      "Inactive Users": "inactive_user",
      "Suspicious": "suspicious",
    };
    return r.type === filterMap[activeFilter];
  });

  const openCount = mockReports.filter((r) => r.status === "open").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Reports & Moderation</h1>
          <p className="text-muted-foreground mt-1">Review, manage, and resolve platform integrity reports</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-card px-4 py-2 rounded-xl border shadow-sm">
          <div className="p-1.5 bg-rose-50 dark:bg-rose-900/30 rounded-lg text-rose-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Open Reports</p>
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{openCount}</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex gap-2 flex-wrap pb-2 border-b border-muted-foreground/10">
        {filterTabs.map((tab) => (
          <Button
            key={tab}
            variant={activeFilter === tab ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(tab)}
            className={`rounded-full h-8 px-4 text-xs font-medium transition-colors ${
              activeFilter === tab 
                ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm" 
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Modern Professional Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Shield} title="No reports found" description="No reports match the current filter. Everything looks clean!" />
      ) : (
        <div className="rounded-2xl border border-muted-foreground/10 bg-white dark:bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b-muted-foreground/10">
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[400px] pl-6">Report Details</TableHead>
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target</TableHead>
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Priority</TableHead>
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((report) => {
                  const config = typeConfig[report.type];
                  return (
                    <TableRow key={report.id} className="hover:bg-accent/30 transition-colors group border-b-muted-foreground/5 py-3">
                      {/* Report Details */}
                      <TableCell className="pl-6 py-4 align-middle">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm ${config.color}`}>
                            <span className="text-lg">{config.icon}</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-sm text-foreground truncate max-w-[280px]">
                              {report.title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-2 mt-1 pr-4 leading-relaxed">
                              {report.description}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell className="align-middle">
                        <Badge variant="outline" className="font-medium text-[11px] bg-background">
                          {report.type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </TableCell>

                      {/* Target */}
                      <TableCell className="align-middle">
                        <div className="flex flex-col gap-1.5">
                          {report.reportedUser && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">{report.reportedUser}</span>
                            </div>
                          )}
                          {report.donationId && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Package className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">{report.donationId}</span>
                            </div>
                          )}
                          {!report.reportedUser && !report.donationId && (
                            <span className="text-xs text-muted-foreground italic">Platform Wide</span>
                          )}
                        </div>
                      </TableCell>

                      {/* Priority */}
                      <TableCell className="align-middle">
                        <StatusBadge status={report.priority} label={`${report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}`} />
                      </TableCell>

                      {/* Status & Date */}
                      <TableCell className="align-middle">
                        <div className="flex flex-col gap-2 items-start">
                          <StatusBadge status={report.status as "open" | "resolved" | "dismissed"} />
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="h-3 w-3" />
                            {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right pr-6 align-middle">
                        {report.status === "open" ? (
                          <div className="flex justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors" title="Resolve">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors" title="Suspend User">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors" title="Delete Listing">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic pr-2">Actioned</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
