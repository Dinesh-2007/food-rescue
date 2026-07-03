"use client";

import { StatCard } from "@/components/stat-card";
import { MapPin, Utensils, CheckCircle2, Leaf } from "lucide-react";

interface ReceiverStatsGridProps {
  nearbyFoodCount: number;
  postedToday: number;
  savedMeals: number;
  co2Saved: number;
}

export function ReceiverStatsGrid({
  nearbyFoodCount,
  postedToday,
  savedMeals,
  co2Saved,
}: ReceiverStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard title="Nearby Food" value={nearbyFoodCount} icon={MapPin} trend="Within 5km" color="emerald" />
      <StatCard title="Posted Today" value={postedToday} icon={Utensils} color="sky" />
      <StatCard title="Saved Meals" value={savedMeals} icon={CheckCircle2} trend="12 this week" trendUp={true} color="violet" />
      <StatCard title="CO₂ Saved (kg)" value={co2Saved} icon={Leaf} trend="Top 15% Receiver" trendUp={true} color="amber" />
    </div>
  );
}
