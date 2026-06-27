"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockDonors } from "@/lib/mock-data";
import {
  Search,
  Eye,
  Trash2,
  ShieldCheck,
  Ban,
  History,
  Users,
} from "lucide-react";

export default function AdminDonorsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDonors.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.businessName?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Donor Management</h1>
          <p className="text-muted-foreground mt-1">Manage and verify donor accounts across the network</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-card px-4 py-2 rounded-xl border shadow-sm">
          <div className="p-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-lg text-sky-600">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Total Donors</p>
            <p className="text-sm font-bold">{mockDonors.length}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white dark:bg-card border-muted-foreground/20 focus-visible:ring-sky-500 shadow-sm"
          />
        </div>
      </div>

      {/* Modern Professional Table */}
      <div className="rounded-2xl border border-muted-foreground/10 bg-white dark:bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-b-muted-foreground/10">
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[320px] pl-6">Donor Info</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trust Score</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Donations</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Food Saved</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Completion</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((donor) => (
                <TableRow key={donor.id} className="hover:bg-accent/30 transition-colors group border-b-muted-foreground/5 h-16">
                  <TableCell className="pl-6 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11 rounded-full border border-background shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-sky-100 to-sky-50 text-sky-700 font-bold dark:from-sky-900/50 dark:to-sky-800/50 dark:text-sky-300">
                          {donor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <span className="font-semibold text-sm text-foreground truncate max-w-[200px]">
                          {donor.businessName || donor.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate max-w-[200px] mt-0.5">
                          {donor.name} • Joined {new Date(donor.joinedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle">
                    <StatusBadge status={donor.verificationStatus as "verified" | "pending" | "unverified"} showDot={false} />
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex items-center gap-3 w-[140px]">
                      <div className="h-2 flex-1 rounded-full bg-muted/60 overflow-hidden ring-1 ring-inset ring-muted-foreground/10">
                        <div
                          className={`h-full rounded-full transition-all ${
                            (donor.trustScore || 0) >= 80 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : 
                            (donor.trustScore || 0) >= 60 ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : 
                            "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                          }`}
                          style={{ width: `${donor.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground w-9">{donor.trustScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right align-middle">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-muted/40 text-xs font-medium border border-muted-foreground/10">
                      {donor.totalDonations}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm text-foreground align-middle">
                    {donor.foodSavedKg?.toLocaleString()} kg
                  </TableCell>
                  <TableCell className="text-right align-middle">
                    <span className={`text-sm font-semibold ${
                      (donor.completionRate || 0) >= 90 ? "text-emerald-600 dark:text-emerald-400" :
                      (donor.completionRate || 0) >= 70 ? "text-amber-600 dark:text-amber-400" :
                      "text-rose-600 dark:text-rose-400"
                    }`}>
                      {donor.completionRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6 align-middle">
                    <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors" title="View Profile">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors" title="Activity History">
                        <History className="h-4 w-4" />
                      </Button>
                      {donor.verificationStatus === "pending" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors" title="Approve Verification">
                          <ShieldCheck className="h-4 w-4" />
                        </Button>
                      )}
                      {donor.status !== "suspended" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors" title="Suspend Account">
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors" title="Delete Account">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Users className="h-8 w-8 mb-2 opacity-20" />
                      <p>No donors found matching your criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
