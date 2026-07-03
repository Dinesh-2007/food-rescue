import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { RadiusTimeline } from "@/components/radius-timeline";
import { CountdownTimer } from "@/components/countdown-timer";
import { DonorStatsGrid } from "./donor-stats-grid";
import {
  Plus,
  ArrowUpRight,
  Eye,
  Users,
  Radio,
  Activity,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getUsers } from "@/actions/users";
import { getDonations } from "@/actions/donations";

export default async function DonorDashboard() {
  let activeDonations: any[] = [];
  let allDonations: any[] = [];
  let me = null;

  try {
    const donors = await getUsers({ role: "donor" });
    if (donors.length > 0) me = donors[0];

    allDonations = await getDonations();
    activeDonations = allDonations.filter(d => d.status === "active").slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  const donorActivity: any[] = []; // Live activity stream will be powered by DB/WebSockets later

  const totalDonations = allDonations.length;
  const completedDonations = allDonations.filter((d: any) => d.status === "completed").length;
  const estimatedMeals = allDonations.reduce((sum: number, d: any) => sum + (d.servings || 0), 0);
  const foodSavedKg = Math.round(estimatedMeals * 0.4);
  const co2Reduced = Math.round(foodSavedKg * 0.7);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {me ? me.name.split(' ')[0] : "Guest"}! 👋</h1>
          <p className="text-muted-foreground">
            {me ? me.businessName || "Individual Donor" : "Food Rescue"} • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link href="/donor/create">
          <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Create Donation
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <DonorStatsGrid
        activeDonationsCount={activeDonations.length}
        totalDonations={totalDonations}
        completedDonations={completedDonations}
        estimatedMeals={estimatedMeals}
        foodSavedKg={foodSavedKg}
        co2Reduced={co2Reduced}
        avgCollectionTime="45m"
        successRate={totalDonations > 0 ? Math.round((completedDonations / totalDonations) * 100) : 0}
      />

      {/* Active Donation Monitor */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Active Donation Monitor
          </CardTitle>
          <Link href="/donor/donations">
            <Button variant="ghost" size="sm" className="text-sky-600 rounded-xl">
              View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {activeDonations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active donations right now. Create one to get started!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeDonations.map((donation: any) => (
                <div
                  key={donation.id}
                  className="p-4 rounded-2xl border hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-14 w-14 rounded-xl overflow-hidden bg-muted shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={donation.image} alt={donation.foodName} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{donation.foodName}</p>
                      <p className="text-xs text-muted-foreground">{donation.quantity}</p>
                      <StatusBadge status={donation.freshness} className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Notified</p>
                      <p className="text-sm font-bold flex items-center justify-center gap-1">
                        <Users className="h-3 w-3" /> {donation.receiversNotified || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="text-sm font-bold flex items-center justify-center gap-1">
                        <Eye className="h-3 w-3" /> {donation.views || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Radius</p>
                      <p className="text-sm font-bold flex items-center justify-center gap-1">
                        <Radio className="h-3 w-3" /> {donation.currentRadius || 5}km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <CountdownTimer targetDate={donation.availableUntil} compact />
                    <Badge variant="secondary" className="rounded-full text-xs truncate max-w-[150px]">
                      {donation.pickupLocation.split(",")[0]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Activity + Notification Tracker */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Activity Timeline */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-sky-500" />
              Live Activity
            </CardTitle>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {donorActivity.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No recent activity.
              </div>
            ) : (
              donorActivity.map((activity, i) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950/30 text-base shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Smart Notification Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Radio className="h-5 w-5 text-sky-500" />
              Smart Notification Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center py-4">
              <RadiusTimeline
                steps={[
                  { radius: 5, status: "completed", notified: 18 },
                  { radius: 8, status: "completed", notified: 16 },
                  { radius: 12, status: "active", notified: 0 },
                  { radius: 20, status: "pending" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border text-center">
                <p className="text-xs text-muted-foreground">Current Radius</p>
                <p className="text-xl font-bold text-sky-600">8 km</p>
              </div>
              <div className="p-3 rounded-xl border text-center">
                <p className="text-xs text-muted-foreground">Receivers Notified</p>
                <p className="text-xl font-bold text-emerald-600">34</p>
              </div>
              <div className="p-3 rounded-xl border text-center">
                <p className="text-xs text-muted-foreground">Views</p>
                <p className="text-xl font-bold text-violet-600">12</p>
              </div>
              <div className="p-3 rounded-xl border text-center">
                <p className="text-xs text-muted-foreground">Next Expansion</p>
                <p className="text-xl font-bold text-amber-600">8 min</p>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-800/50">
              <p className="text-xs font-medium text-sky-700 dark:text-sky-400 mb-2">💡 Impact Summary</p>
              <p className="text-sm text-muted-foreground">
                Your donations have served <span className="font-bold text-foreground">2,250 meals</span> and saved <span className="font-bold text-foreground">1,250 kg</span> of food from going to waste.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
