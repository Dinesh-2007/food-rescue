"use client";

import { StatCard } from "@/components/stat-card";
import {
  Users,
  Package,
  Zap,
  Leaf,
  Utensils,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Timer,
} from "lucide-react";

interface AdminStatsGridProps {
  totalDonors: number;
  totalReceivers: number;
  todaysDonations: number;
  activeDonationsCount: number;
  foodSavedKg: number;
  co2Reduction: number;
  avgCollectionTime: string;
  collectionSuccessRate: number;
  expiredToday: number;
  pendingVerifications: number;
}

export function AdminStatsGrid({
  totalDonors,
  totalReceivers,
  todaysDonations,
  activeDonationsCount,
  foodSavedKg,
  co2Reduction,
  avgCollectionTime,
  collectionSuccessRate,
  expiredToday,
  pendingVerifications,
}: AdminStatsGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Donors" value={totalDonors} icon={Users} trend="12% this month" trendUp={true} color="sky" />
        <StatCard title="Total Receivers" value={totalReceivers} icon={Users} trend="18% this month" trendUp={true} color="emerald" />
        <StatCard title="Today's Donations" value={todaysDonations} icon={Package} color="amber" />
        <StatCard title="Active Donations" value={activeDonationsCount} icon={Zap} color="violet" />
        <StatCard title="Food Saved (kg)" value={foodSavedKg.toLocaleString()} icon={Utensils} trend="1.2 tons this month" trendUp={true} color="rose" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="CO₂ Reduced (kg)" value={co2Reduction.toLocaleString()} icon={Leaf} trend="850 kg this month" trendUp={true} color="emerald" />
        <StatCard title="Avg Collection Time" value={avgCollectionTime} icon={Timer} trend="-3 min" trendUp={true} color="sky" />
        <StatCard title="Success Rate" value={`${collectionSuccessRate}%`} icon={TrendingUp} trend="+2%" trendUp={true} color="violet" />
        <StatCard title="Expired Today" value={expiredToday} icon={AlertTriangle} color="rose" />
        <StatCard title="Pending Verifications" value={pendingVerifications} icon={ShieldCheck} color="amber" />
      </div>
    </>
  );
}
