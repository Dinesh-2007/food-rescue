"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { MapPlaceholder } from "@/components/map-placeholder";
import { EmptyState } from "@/components/empty-state";
import {
  Search,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Ban,
  Building2,
  Church,
} from "lucide-react";

const typeIcons: Record<string, string> = {
  temple: "🛕",
  church: "⛪",
  mosque: "🕌",
  community_hall: "🏛️",
  community_center: "🏢",
};

const typeLabels: Record<string, string> = {
  temple: "Temple",
  church: "Church",
  mosque: "Mosque",
  community_hall: "Community Hall",
  community_center: "Community Center",
};

export default function PickupLocationsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const mockPickupLocations: any[] = [];

  const filtered = mockPickupLocations.filter((l) => {
    if (search && !l.name?.toLowerCase().includes(search.toLowerCase()) && !l.address?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pickup Locations</h1>
          <p className="text-muted-foreground">Manage community food distribution points</p>
        </div>
        <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md self-start">
          <Plus className="h-4 w-4 mr-2" /> Add Location
        </Button>
      </div>

      {/* Search + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")} className={`rounded-xl ${view === "list" ? "gradient-sky text-white border-0" : ""}`}>
            List View
          </Button>
          <Button variant={view === "map" ? "default" : "outline"} size="sm" onClick={() => setView("map")} className={`rounded-xl ${view === "map" ? "gradient-sky text-white border-0" : ""}`}>
            Map View
          </Button>
        </div>
      </div>

      {view === "map" ? (
        <MapPlaceholder
          height="h-[500px]"
          locationLabel="Bangalore, Karnataka"
          markers={filtered.map((l, i) => ({
            id: l.id,
            label: l.name,
            type: l.status === "active" ? "available" : "expired",
            position: { top: `${20 + i * 12}%`, left: `${25 + i * 10}%` },
          }))}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/30 text-2xl shrink-0">
                    {typeIcons[location.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{location.name}</p>
                    <p className="text-xs text-muted-foreground">{typeLabels[location.type]}</p>
                  </div>
                  <StatusBadge status={location.status} />
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-xs">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{location.city}, {location.state}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-muted/50 text-center">
                    <p className="text-sm font-bold">{location.dailyCapacity}</p>
                    <p className="text-[10px] text-muted-foreground">Capacity</p>
                  </div>
                  <div className="p-2 rounded-xl bg-muted/50 text-center">
                    <p className="text-sm font-bold">{location.totalPickups}</p>
                    <p className="text-[10px] text-muted-foreground">Pickups</p>
                  </div>
                  <div className="p-2 rounded-xl bg-muted/50 text-center">
                    <p className="text-[10px] font-medium">{location.contactPerson.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground">Contact</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs h-8">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  {location.status === "active" ? (
                    <Button variant="outline" size="sm" className="rounded-xl text-xs h-8 text-amber-600">
                      <Ban className="h-3 w-3" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="rounded-xl text-xs h-8 text-emerald-600">
                      Enable
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="rounded-xl text-xs h-8 text-rose-600">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
