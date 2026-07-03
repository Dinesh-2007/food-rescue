"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDonations } from "@/actions/donations";
import {
  Utensils,
  Package,
  Leaf,
  Timer,
  MapPin,
  Award,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PIE_COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e"];

export default function AdminAnalyticsPage() {
  const [estimatedMeals, setEstimatedMeals] = useState(0);
  const [foodSavedKg, setFoodSavedKg] = useState(0);
  const [co2Reduction, setCo2Reduction] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const allDonations = await getDonations();
        const meals = allDonations.reduce((sum: number, d: any) => sum + (d.servings || 0), 0);
        const foodKg = Math.round(meals * 0.4);
        const co2 = Math.round(foodKg * 0.7);
        setEstimatedMeals(meals);
        setFoodSavedKg(foodKg);
        setCo2Reduction(co2);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  // Default empty charts since mock data was removed
  const donationsOverTime = [{ month: "Jan", donations: 0 }, { month: "Feb", donations: 0 }];
  const userGrowth = [{ month: "Jan", donors: 0, receivers: 0 }];
  const foodDistribution = [{ name: "Other", value: 100 }];
  const collectionSuccessRate = [{ name: "Collected", value: 0 }, { name: "Expired", value: 0 }];
  const peakDonationHours = [{ hour: "12pm", count: 0 }];
  const topDonorLeaderboard: any[] = [];
  const mostActiveCities: any[] = [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">Business intelligence and platform performance metrics</p>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Meals Saved" value={estimatedMeals.toLocaleString()} icon={Utensils} trend="+0% this month" trendUp={true} color="sky" />
        <StatCard title="Food Saved" value={`${foodSavedKg.toLocaleString()} kg`} icon={Package} trend="+0% this month" trendUp={true} color="emerald" />
        <StatCard title="CO₂ Reduction" value={`${co2Reduction} kg`} icon={Leaf} trend="+0 kg this month" trendUp={true} color="violet" />
        <StatCard title="Avg Collection" value="45 min" icon={Timer} trend="-0 min" trendUp={true} color="amber" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Pickups" value="24" icon={MapPin} color="sky" />
        <StatCard title="Top City" value="Bangalore" icon={Award} color="emerald" />
        <StatCard title="Monthly Growth" value="+15%" icon={TrendingUp} trendUp={true} color="violet" />
        <StatCard title="Success Rate" value="87%" icon={BarChart3} trend="+2%" trendUp={true} color="rose" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donation Trend */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-500" /> Donation Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={donationsOverTime}>
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

        {/* Collection Success Rate */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" /> Collection Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={collectionSuccessRate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                  <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Peak Donation Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-500" /> Peak Donation Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakDonationHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                  <Bar dataKey="donations" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Food Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Food Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={foodDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {foodDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {foodDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-sky-500" /> User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }} />
                  <Legend />
                  <Bar dataKey="donors" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Donors" />
                  <Bar dataKey="receivers" fill="#10b981" radius={[4, 4, 0, 0]} name="Receivers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard + Cities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Donor Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" /> Top Donor Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDonorLeaderboard.map((donor, i) => (
                <div key={donor.name} className="flex items-center gap-3 p-3 rounded-xl border hover:bg-accent/50 transition-colors">
                  <span className="text-xl w-8 text-center">{donor.badge || `#${i + 1}`}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{donor.name}</p>
                    <p className="text-xs text-muted-foreground">{donor.donations} donations • {donor.meals.toLocaleString()} meals</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-sky-600">{donor.donations}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Active Cities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-500" /> Most Active Cities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mostActiveCities.map((city, i) => (
                <div key={city.city} className="p-3 rounded-xl border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{city.city}</p>
                    <p className="text-sm font-bold text-sky-600">{city.donations.toLocaleString()} donations</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${(city.donations / mostActiveCities[0].donations) * 100}%` }} />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{city.donors} donors</span>
                    <span>{city.receivers} receivers</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
