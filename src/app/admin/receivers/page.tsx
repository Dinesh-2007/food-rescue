"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { mockReceivers } from "@/lib/mock-data";
import { Search, Eye, Trash2, Ban, Users, Bell, MapPin, History } from "lucide-react";

export default function AdminReceiversPage() {
  const [search, setSearch] = useState("");

  const filtered = mockReceivers.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receiver Management</h1>
          <p className="text-muted-foreground">Manage community food receivers</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{mockReceivers.length} Receivers</span>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search receivers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((receiver) => (
          <Card key={receiver.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-12 w-12 rounded-xl">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold rounded-xl dark:bg-emerald-900 dark:text-emerald-300">
                    {receiver.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{receiver.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{receiver.email}</p>
                </div>
                <StatusBadge status={receiver.verificationStatus as "verified" | "pending" | "unverified"} showDot={false} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                  <p className="text-lg font-bold">{receiver.totalCollections}</p>
                  <p className="text-[10px] text-muted-foreground">Collections</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                  <p className="text-lg font-bold">{receiver.notificationsReceived}</p>
                  <p className="text-[10px] text-muted-foreground">Notifications</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs font-medium truncate">{receiver.city}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">City</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Joined {receiver.joinedDate}</span>
                <span>Active {receiver.lastActive}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs h-8">
                  <Eye className="h-3 w-3 mr-1" /> View Profile
                </Button>
                {receiver.status !== "suspended" ? (
                  <Button variant="outline" size="sm" className="rounded-xl text-xs h-8 text-amber-600">
                    <Ban className="h-3 w-3" />
                  </Button>
                ) : (
                  <StatusBadge status="suspended" />
                )}
                <Button variant="outline" size="sm" className="rounded-xl text-xs h-8 text-rose-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
