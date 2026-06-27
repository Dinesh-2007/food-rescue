"use client";

import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  donorStats,
  monthlyDonorDonations,
  donorFoodCategories,
} from "@/lib/mock-data";
import {
  Utensils,
  Package,
  Leaf,
  Timer,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PIE_COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e"];

export default function DonorAnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Impact Analytics</h1>
        <p className="text-muted-foreground">Track the difference you are making in the community</p>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Meals Served" value={donorStats.estimatedMeals.toLocaleString()} icon={Utensils} trend="+12% this month" trendUp={true} color="sky" />
        <StatCard title="Food Saved" value={`${donorStats.foodSavedKg.toLocaleString()} kg`} icon={Package} trend="+18% this month" trendUp={true} color="emerald" />
        <StatCard title="CO₂ Reduction" value={`${donorStats.co2Reduced} kg`} icon={Leaf} trend="+85 kg this month" trendUp={true} color="violet" />
        <StatCard title="Success Rate" value={`${donorStats.successRate}%`} icon={TrendingUp} trend="+2%" trendUp={true} color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donation Trend */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-500" /> Donation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyDonorDonations}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                  <Area type="monotone" dataKey="donations" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDonations)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Food Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Donated Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donorFoodCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {donorFoodCategories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {donorFoodCategories.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" /> Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border">
              <div>
                <p className="text-sm font-medium">Average Collection Time</p>
                <p className="text-xs text-muted-foreground mt-1">From posting to pickup</p>
              </div>
              <div className="flex items-center gap-2 text-sky-600 font-bold text-lg">
                <Timer className="h-5 w-5" />
                {donorStats.avgCollectionTime}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border">
              <div>
                <p className="text-sm font-medium">Average Views per Post</p>
                <p className="text-xs text-muted-foreground mt-1">Before collection</p>
              </div>
              <div className="text-lg font-bold text-violet-600">32</div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border">
              <div>
                <p className="text-sm font-medium">Average Receivers Notified</p>
                <p className="text-xs text-muted-foreground mt-1">Per donation</p>
              </div>
              <div className="text-lg font-bold text-emerald-600">45</div>
            </div>
          </CardContent>
        </Card>

        {/* Milestone Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5 text-amber-500" /> Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center pt-6">
             <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-amber-50 text-amber-500 mb-2">
               <Utensils className="h-10 w-10" />
             </div>
             <div>
               <h3 className="text-xl font-bold mb-1">3,000 Meals Milestone</h3>
               <p className="text-sm text-muted-foreground">You are only 750 meals away from reaching the Platinum Donor tier!</p>
             </div>
             <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
               <div className="h-full bg-amber-500 w-3/4 rounded-full" />
             </div>
             <p className="text-sm font-medium text-amber-600">2,250 / 3,000 Meals</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
