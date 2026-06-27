"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/lib/mock-data";
import { EmptyState } from "@/components/empty-state";
import { Bell, Check, Trash2, Settings } from "lucide-react";
import Link from "next/link";

export default function DonorNotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your donation activity</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" className="rounded-xl">
              <Check className="h-4 w-4 mr-2" /> Mark all read
            </Button>
          )}
          <Link href="/donor/settings">
            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2">
        <Badge variant="secondary" className="rounded-full px-3 py-1 bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400">
          All Notifications
        </Badge>
        {unreadCount > 0 && (
          <Badge variant="secondary" className="rounded-full px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            {unreadCount} Unread
          </Badge>
        )}
      </div>

      {mockNotifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications yet" description="You'll see updates here when receivers interact with your donations." />
      ) : (
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-sky-500 bg-sky-50/20 dark:bg-sky-950/10" : ""
              }`}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl shrink-0">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                      <h3 className={`font-semibold text-base ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(notification.createdAt).toLocaleString([], {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                    
                    {/* Meta info if available */}
                    <div className="flex flex-wrap gap-3">
                      {notification.receiverName && (
                        <Badge variant="outline" className="rounded-full text-xs font-normal">
                          👤 {notification.receiverName}
                        </Badge>
                      )}
                      {notification.timeRemaining && (
                        <Badge variant="outline" className="rounded-full text-xs font-normal text-amber-600 border-amber-200">
                          ⏳ {notification.timeRemaining}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    {!notification.read && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-emerald-600 hover:bg-emerald-50" title="Mark Read">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-600 hover:bg-rose-50" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
