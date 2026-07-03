"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { EmptyState } from "@/components/empty-state";
import { getDonations } from "@/actions/donations";
import {
  Search,
  MapPin,
  Utensils,
  Filter,
  Bookmark,
  Navigation,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

const filterTabs = ["All", "< 2km", "< 5km", "Vegetarian", "High Priority"];

export default function AvailableFoodPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [available, setAvailable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let data = await getDonations({ status: "active" });
        data = data.sort((a: any, b: any) => parseFloat(a.distance || "0") - parseFloat(b.distance || "0"));
        setAvailable(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = available.filter((d) => {
    if (search && !d.foodName.toLowerCase().includes(search.toLowerCase()) && !d.donorName.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === "< 2km" && parseFloat(d.distance || "5") > 2) return false;
    if (activeFilter === "< 5km" && parseFloat(d.distance || "5") > 5) return false;
    if (activeFilter === "Vegetarian" && !d.isVeg) return false;
    if (activeFilter === "High Priority" && d.priority !== "high") return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Available Food Nearby</h1>
          <p className="text-muted-foreground">Discover and claim food donations in your area</p>
        </div>
        <Link href="/receiver/map">
          <Button variant="outline" className="rounded-xl gradient-sky text-white border-0">
            <Navigation className="h-4 w-4 mr-2" /> View on Map
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search food, restaurants, or locations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
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

      {/* Food Grid */}
      {loading ? (
        <div className="py-8 text-center text-muted-foreground animate-pulse">Loading available food...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Utensils} title="No food found" description="Try adjusting your filters or check back later." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((food) => (
            <Card key={food.id} className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border flex flex-col h-full">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={food.image} alt={food.foodName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Overlays */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-sky-500" /> {food.distance || "5km"}
                  </div>
                  {food.priority === "high" && (
                    <div className="bg-rose-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1 animate-pulse">
                      <Zap className="h-3 w-3" /> Urgent
                    </div>
                  )}
                </div>
                
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/20">
                  <Bookmark className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                   <StatusBadge status={food.freshness} />
                   <div className="bg-black/60 backdrop-blur-md text-white rounded-lg px-2 py-1">
                     <CountdownTimer targetDate={food.availableUntil} compact className="text-white" />
                   </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="mb-2 flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{food.foodName}</h3>
                    <span className="text-sm font-medium text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">{food.quantity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{food.donorName}</p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="text-[10px] font-medium bg-muted px-2 py-1 rounded-md">{food.category}</span>
                  <span className="text-[10px] font-medium bg-muted px-2 py-1 rounded-md">{food.isVeg ? "Veg" : "Non-Veg"}</span>
                  <span className="text-[10px] font-medium bg-muted px-2 py-1 rounded-md truncate max-w-[120px]">{food.pickupLocation.split(",")[0]}</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Link href={`/receiver/available/${food.id}`} className="col-span-2">
                    <Button className="w-full rounded-xl gradient-sky text-white border-0 shadow-md h-10 hover:opacity-90 transition-opacity">
                      Claim Food <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
