import { AdminStatsGrid } from "./admin-stats-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { RadiusTimeline } from "@/components/radius-timeline";
import { CountdownTimer } from "@/components/countdown-timer";
import { getUsers } from "@/actions/users";
import { getDonations } from "@/actions/donations";
import {
  Package,
  Eye,
  Radio,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { AdminCharts } from "./admin-charts";

export default async function AdminDashboard() {
  let activeDonations: any[] = [];
  let allDonations: any[] = [];
  let totalDonors = 0;
  let totalReceivers = 0;

  try {
    const donors = await getUsers({ role: "donor" });
    const receivers = await getUsers({ role: "receiver" });
    totalDonors = donors.length;
    totalReceivers = receivers.length;

    allDonations = await getDonations();
    activeDonations = allDonations.filter(d => d.status === "active").slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
  }

  const mockLiveActivity: any[] = [];
  const todaysDonations = allDonations.length; 
  const completedDonations = allDonations.filter((d: any) => d.status === "completed").length;
  const expiredToday = allDonations.filter((d: any) => d.status === "expired").length;
  const estimatedMeals = allDonations.reduce((sum: number, d: any) => sum + (d.servings || 0), 0);
  const foodSavedKg = Math.round(estimatedMeals * 0.4);
  const co2Reduction = Math.round(foodSavedKg * 0.7);
  const collectionSuccessRate = allDonations.length > 0 ? Math.round((completedDonations / allDonations.length) * 100) : 0;

  const donationStatusDistribution = [
    { name: "Completed", value: completedDonations, fill: "hsl(142, 76%, 36%)" },
    { name: "Active", value: activeDonations.length, fill: "hsl(199, 89%, 48%)" },
    { name: "Expired", value: expiredToday, fill: "hsl(349, 89%, 60%)" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and platform health overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Platform Online
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <AdminStatsGrid
        totalDonors={totalDonors}
        totalReceivers={totalReceivers}
        todaysDonations={todaysDonations}
        activeDonationsCount={activeDonations.length}
        foodSavedKg={foodSavedKg}
        co2Reduction={co2Reduction}
        avgCollectionTime="45m"
        collectionSuccessRate={collectionSuccessRate}
        expiredToday={expiredToday}
        pendingVerifications={0}
      />

      {/* Live Activity + Donation Status Chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Platform Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-sky-500" />
              Live Platform Activity
            </CardTitle>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {mockLiveActivity.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No live activity available.
              </div>
            ) : (
              mockLiveActivity.map((activity, i) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/30 text-lg shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{activity.timestamp}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Donation Status Chart - Extracted to Client Component */}
        <AdminCharts data={donationStatusDistribution} />
      </div>

      {/* Smart Notification Radius Monitoring */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Radio className="h-5 w-5 text-sky-500" />
            Smart Notification Radius Monitoring
          </CardTitle>
          <Link href="/admin/notification-logs">
            <Button variant="ghost" size="sm" className="text-sky-600 rounded-xl">
              View Logs <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl border bg-sky-50/50 dark:bg-sky-950/20">
              <p className="text-xs text-muted-foreground mb-1">Initial Radius</p>
              <p className="text-xl font-bold text-sky-600">5 km</p>
            </div>
            <div className="p-4 rounded-2xl border bg-emerald-50/50 dark:bg-emerald-950/20">
              <p className="text-xs text-muted-foreground mb-1">Avg Current Radius</p>
              <p className="text-xl font-bold text-emerald-600">11.2 km</p>
            </div>
            <div className="p-4 rounded-2xl border bg-violet-50/50 dark:bg-violet-950/20">
              <p className="text-xs text-muted-foreground mb-1">Users Notified Today</p>
              <p className="text-xl font-bold text-violet-600">384</p>
            </div>
            <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-amber-950/20">
              <p className="text-xs text-muted-foreground mb-1">Collection via Expansion</p>
              <p className="text-xl font-bold text-amber-600">34%</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <RadiusTimeline
              steps={[
                { radius: 5, status: "completed", notified: 18 },
                { radius: 8, status: "completed", notified: 31 },
                { radius: 12, status: "active", notified: 36 },
                { radius: 20, status: "pending" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-sky-500" />
            Recent Donations
          </CardTitle>
          <Link href="/admin/donations">
            <Button variant="ghost" size="sm" className="text-sky-600 rounded-xl">
              View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {activeDonations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active donations.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Food</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Donor</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Pickup Location</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Time Remaining</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Radius</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Status</th>
                    <th className="text-right text-xs font-medium text-muted-foreground pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {activeDonations.map((donation: any) => (
                    <tr key={donation.id} className="hover:bg-accent/30 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={donation.image} alt={donation.foodName} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{donation.foodName}</p>
                            <p className="text-xs text-muted-foreground">{donation.quantity}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm">{donation.donorName}</td>
                      <td className="py-3 text-sm text-muted-foreground max-w-[200px] truncate">{donation.pickupLocation}</td>
                      <td className="py-3">
                        <CountdownTimer targetDate={donation.availableUntil} compact />
                      </td>
                      <td className="py-3">
                        <Badge variant="secondary" className="rounded-full text-xs">
                          {donation.currentRadius || 5} km
                        </Badge>
                      </td>
                      <td className="py-3">
                        <StatusBadge status={donation.status} />
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
