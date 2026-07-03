"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { getDonations } from "@/actions/donations";
import {
  Search,
  History,
  Utensils,
  Leaf,
  MapPin,
  CheckCircle2,
  Filter,
} from "lucide-react";

const filterTabs = ["All Time", "This Month", "This Week"];

export default function ReceiverHistoryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Time");
  const [myHistory, setMyHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDonations({ status: "completed" });
        setMyHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Mocking history — shows completed donations

  const filtered = myHistory.filter((d) => {
    if (search && !d.foodName.toLowerCase().includes(search.toLowerCase()) && !d.donorName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const savedMeals = myHistory.length * 10;
  const co2Saved = Math.round(savedMeals * 0.3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Collection History</h1>
        <p className="text-muted-foreground">Review your past food rescues and impact</p>
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-sky-50/50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 flex items-center justify-center mb-2">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">{myHistory.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Rescues</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center mb-2">
              <Utensils className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{savedMeals}</p>
            <p className="text-xs text-muted-foreground mt-1">Meals Equivalent</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 flex items-center justify-center mb-2">
              <Leaf className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{co2Saved}</p>
            <p className="text-xs text-muted-foreground mt-1">CO₂ Reduced (kg)</p>
          </CardContent>
        </Card>
        <Card className="bg-violet-50/50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <CheckCircle2 className="h-5 w-5 text-violet-500 mb-2" />
            <p className="text-2xl font-bold text-violet-700 dark:text-violet-400">100%</p>
            <p className="text-xs text-muted-foreground">Pickup Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search past collections..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeFilter === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full text-xs ${activeFilter === tab ? "gradient-sky text-white border-0" : ""}`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* History List */}
      {filtered.length === 0 ? (
        <EmptyState icon={History} title="No history found" description="You haven't completed any food rescues yet." />
      ) : (
        <div className="space-y-4">
          {filtered.map((food) => (
            <Card key={food.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={food.image} alt={food.foodName} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-base truncate pr-2">{food.foodName}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(food.createdAt).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{food.quantity}</span>
                      <span>•</span>
                      <span className="truncate">{food.donorName}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-1 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Collected Successfully
                      </span>
                      <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-sky-500" /> {food.pickupLocation.split(",")[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex sm:flex-col gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl w-full">View Details</Button>
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
