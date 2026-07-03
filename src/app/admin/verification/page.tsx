"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  Clock,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

export default function VerificationQueuePage() {
  const mockVerificationQueue: any[] = [];
  const pending: any[] = [];
  const needsInfo: any[] = [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Verification Queue</h1>
          <p className="text-muted-foreground">Review and approve new donor registrations</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="rounded-full">
            <Clock className="h-3 w-3 mr-1" /> {pending.length} Pending
          </Badge>
          <Badge variant="secondary" className="rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <MessageSquare className="h-3 w-3 mr-1" /> {needsInfo.length} Needs Info
          </Badge>
        </div>
      </div>

      {mockVerificationQueue.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No pending verifications"
          description="All donor registrations have been processed."
        />
      ) : (
        <div className="space-y-4">
          {mockVerificationQueue.map((entry) => (
            <Card key={entry.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left - Business Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 shrink-0">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{entry.businessName}</h3>
                          <StatusBadge status={entry.status as "pending" | "more_info_needed"} />
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.businessCategory} • {entry.city}</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium text-foreground">Owner:</span> {entry.ownerName}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium text-foreground">License:</span> {entry.licenseNumber}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" /> {entry.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" /> {entry.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> Submitted on {entry.submittedDate}
                    </div>

                    {entry.notes && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-300">{entry.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right - Documents & Actions */}
                  <div className="lg:w-64 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Documents</p>
                      <div className="space-y-2">
                        {entry.documents.map((doc: string) => (
                          <div key={doc} className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                            <FileText className="h-4 w-4 text-sky-500" />
                            <span className="text-sm truncate">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 w-full">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                      </Button>
                      <Button variant="outline" className="rounded-xl w-full text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-950/30">
                        <MessageSquare className="h-4 w-4 mr-2" /> Request Info
                      </Button>
                      <Button variant="outline" className="rounded-xl w-full text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/30">
                        <XCircle className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
