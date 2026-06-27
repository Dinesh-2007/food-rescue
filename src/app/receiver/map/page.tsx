"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPlaceholder } from "@/components/map-placeholder";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { mockDonations } from "@/lib/mock-data";
import { Search, Filter, MapPin, Zap, ArrowRight, X } from "lucide-react";
import Link from "next/link";

const filterTabs = ["All", "< 2km", "< 5km", "Vegetarian", "High Priority"];

export default function ReceiverMapPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const available = mockDonations.filter((d) => d.status === "active");
  const selectedFood = available.find(d => d.id === selectedId);

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] lg:h-screen flex flex-col p-4 sm:p-6 lg:p-0">
      {/* Mobile/Tablet Header (hidden on large desktop where sidebar is present) */}
      <div className="lg:hidden mb-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Food Map</h1>
          <p className="text-muted-foreground">Discover food locations near you</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search area..." className="pl-10 h-10 rounded-xl" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl lg:rounded-none overflow-hidden border lg:border-0 shadow-inner">
        {/* The Map */}
        <MapPlaceholder
          height="h-full min-h-[500px]"
          locationLabel="Your Location (Koramangala)"
          onMarkerClick={setSelectedId}
          markers={available.map((food, i) => {
             const isUrgent = food.priority === "high";
             return {
               id: food.id,
               label: food.foodName,
               type: isUrgent ? "expired" : food.freshness === "expiring_soon" ? "expiring" : "available",
               position: { 
                 top: `${30 + (i * 15) % 50}%`, 
                 left: `${20 + (i * 20) % 60}%` 
               },
             };
          })}
        />

        {/* Floating Controls Overlay (Desktop) */}
        <div className="hidden lg:block absolute top-6 left-6 right-6 pointer-events-none z-30">
          <div className="flex items-start justify-between">
            <div className="w-80 space-y-4 pointer-events-auto">
              <Card className="shadow-xl border-0 bg-background/95 backdrop-blur-md">
                <CardContent className="p-4 space-y-3">
                  <h2 className="font-semibold text-lg">Food Map</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search locations..." className="pl-10 h-10 rounded-xl bg-background" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {filterTabs.map((tab) => (
                      <Button
                        key={tab}
                        variant={activeFilter === tab ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(tab)}
                        className={`rounded-full h-7 text-[10px] ${activeFilter === tab ? "gradient-sky text-white border-0" : "bg-background"}`}
                      >
                        {tab}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border pointer-events-auto flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" /> Available ({available.length})</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" /> High Priority</div>
            </div>
          </div>
        </div>

        {/* Selected Food Popover (Bottom/Side) */}
        {selectedFood && (
          <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:top-24 lg:bottom-auto lg:right-6 lg:w-96 z-40 animate-slide-up lg:animate-slide-in-right">
            <Card className="shadow-2xl border-sky-200 dark:border-sky-800 overflow-hidden">
              <div className="relative h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedFood.image} alt={selectedFood.foodName} className="w-full h-full object-cover" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-sky-500" /> {selectedFood.distance}
                  </div>
                  {selectedFood.priority === "high" && (
                    <div className="bg-rose-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1 animate-pulse">
                      <Zap className="h-3 w-3" /> Urgent
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg leading-tight">{selectedFood.foodName}</h3>
                    <span className="text-sm font-medium text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">{selectedFood.quantity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedFood.donorName}</p>
                </div>

                <div className="flex items-center justify-between">
                   <StatusBadge status={selectedFood.freshness} />
                   <div className="bg-muted px-2 py-1 rounded-lg">
                     <CountdownTimer targetDate={selectedFood.availableUntil} compact />
                   </div>
                </div>

                <Link href={`/receiver/available/${selectedFood.id}`} className="block">
                  <Button className="w-full rounded-xl gradient-sky text-white border-0 shadow-md h-11 hover:opacity-90">
                    View & Claim <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
