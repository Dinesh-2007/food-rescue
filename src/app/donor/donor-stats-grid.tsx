"use client";

import { StatCard } from "@/components/stat-card";
import {
  Package,
  Zap,
  CheckCircle2,
  Utensils,
  Leaf,
  Timer,
  TrendingUp,
} from "lucide-react";

interface DonorStatsGridProps {
  activeDonationsCount: number;
  totalDonations: number;
  completedDonations: number;
  estimatedMeals: number;
  foodSavedKg: number;
  co2Reduced: number;
  avgCollectionTime: string;
  successRate: number;
}

export function DonorStatsGrid({
  activeDonationsCount,
  totalDonations,
  completedDonations,
  estimatedMeals,
  foodSavedKg,
  co2Reduced,
  avgCollectionTime,
  successRate,
}: DonorStatsGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Donations" value={totalDonations} icon={Package} trend="12% this month" trendUp={true} color="sky" />
        <StatCard title="Active Donations" value={activeDonationsCount} icon={Zap} color="amber" />
        <StatCard title="Completed" value={completedDonations} icon={CheckCircle2} trend="8 this week" trendUp={true} color="emerald" />
        <StatCard title="Est. Meals Served" value={estimatedMeals.toLocaleString()} icon={Utensils} trend="150 this month" trendUp={true} color="violet" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Food Saved (kg)" value={foodSavedKg.toLocaleString()} icon={Package} color="sky" />
        <StatCard title="CO₂ Reduced (kg)" value={co2Reduced} icon={Leaf} color="emerald" />
        <StatCard title="Avg Collection" value={avgCollectionTime} icon={Timer} color="amber" />
        <StatCard title="Success Rate" value={`${successRate}%`} icon={TrendingUp} trend="+2%" trendUp={true} color="violet" />
      </div>
    </>
  );
}
