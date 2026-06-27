"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { RadiusTimeline } from "@/components/radius-timeline";
import { MapPlaceholder } from "@/components/map-placeholder";
import { mockDonations, mockNotificationLogs } from "@/lib/mock-data";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Eye,
  Users,
  Radio,
  Edit,
  Share2,
  Copy,
  Trash2,
  Utensils,
  Leaf,
} from "lucide-react";
import Link from "next/link";

export default function DonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const donation = mockDonations.find((d) => d.id === id) || mockDonations[0];
  const notifLog = mockNotificationLogs.find((l) => l.donationId === donation.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/donor/donations">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{donation.foodName}</h1>
          <p className="text-muted-foreground">{donation.id} • {donation.category}</p>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card className="overflow-hidden">
            <div className="h-64 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={donation.image} alt={donation.foodName} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{donation.description}</p>
            </CardContent>
          </Card>

          {/* Pickup Location Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-sky-500" /> Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{donation.pickupLocation}</p>
              <MapPlaceholder height="h-48" showLegend={false} markers={[{ id: "1", label: donation.foodName, type: "available", position: { top: "45%", left: "50%" } }]} />
            </CardContent>
          </Card>

          {/* Notification Timeline */}
          {notifLog && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Radio className="h-5 w-5 text-sky-500" /> Notification Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <RadiusTimeline
                    steps={notifLog.expansionTimeline.map((e, i) => ({
                      radius: e.radius,
                      notified: e.notified,
                      time: new Date(e.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      status: i < notifLog.expansionTimeline.length - 1 ? "completed" as const : notifLog.collectionResult === "collected" ? "completed" as const : "active" as const,
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Sidebar */}
        <div className="space-y-4">
          {/* Countdown */}
          {donation.status === "active" && (
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground mb-2">Expires In</p>
                <CountdownTimer targetDate={donation.availableUntil} />
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-sky-500" /> Views</div>
                <span className="font-bold">{donation.views}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-emerald-500" /> Notified</div>
                <span className="font-bold">{donation.receiversNotified}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Radio className="h-4 w-4 text-violet-500" /> Radius</div>
                <span className="font-bold">{donation.currentRadius} km</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-amber-500" /> Expansions</div>
                <span className="font-bold">{donation.expansions}</span>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="font-medium">{donation.quantity}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium">{donation.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{donation.isVeg ? "Vegetarian" : "Non-Vegetarian"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Temperature</span><span className="font-medium">{donation.temperature}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Priority</span><StatusBadge status={donation.priority} /></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Freshness</span><StatusBadge status={donation.freshness} /></div>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 text-center">
                  <Utensils className="h-5 w-5 mx-auto text-sky-500 mb-1" />
                  <p className="text-lg font-bold">{donation.servings}</p>
                  <p className="text-[10px] text-muted-foreground">Meals</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 text-center">
                  <Leaf className="h-5 w-5 mx-auto text-emerald-500 mb-1" />
                  <p className="text-lg font-bold">{Math.round((donation.servings || 0) * 0.3)}</p>
                  <p className="text-[10px] text-muted-foreground">kg CO₂ saved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="rounded-xl w-full"><Edit className="h-4 w-4 mr-2" /> Edit Donation</Button>
            <Button variant="outline" className="rounded-xl w-full"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
            <Button variant="outline" className="rounded-xl w-full"><Copy className="h-4 w-4 mr-2" /> Duplicate</Button>
            <Button variant="outline" className="rounded-xl w-full text-rose-600 border-rose-200 hover:bg-rose-50"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
