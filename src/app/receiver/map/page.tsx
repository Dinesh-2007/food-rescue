"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { getDonations } from "@/actions/donations";
import { geocodeAddress } from "@/actions/geocode";
import { Search, Filter, MapPin, Zap, ArrowRight, X, Navigation, Loader2 } from "lucide-react";
import Link from "next/link";
import type { GoogleMapMarker } from "@/components/google-map";

// Lazy-load the map so it only runs client-side
const GoogleMap = dynamic(() => import("@/components/google-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[500px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <span className="text-sm font-medium">Loading map…</span>
      </div>
    </div>
  ),
});

const filterTabs = ["All", "< 2km", "< 5km", "Vegetarian", "High Priority"];

/** Default center: Koramangala, Bangalore */
const DEFAULT_CENTER = { lat: 12.9352, lng: 77.6245 };

type FoodWithCoords = {
  id: number | string;
  foodName: string;
  category: string;
  quantity: string;
  servings: number;
  description: string;
  image: string;
  imageUrl?: string;
  pickupLocation: string;
  availableFrom: string;
  availableUntil: string;
  status: string;
  donorName: string;
  distance: string;
  freshness: string;
  priority: string;
  latitude?: number;
  longitude?: number;
  lat?: number;
  lng?: number;
};

export default function ReceiverMapPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [donations, setDonations] = useState<FoodWithCoords[]>([]);
  const [markers, setMarkers] = useState<GoogleMapMarker[]>([]);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [geocoding, setGeocoding] = useState(false);

  // Load donations
  useEffect(() => {
    getDonations({ status: "active" })
      .then((rows) => setDonations(rows as FoodWithCoords[]))
      .catch(console.error);
  }, []);

  // Geocode donations that don't have lat/lng already stored
  useEffect(() => {
    if (!donations.length) return;

    setGeocoding(true);
    Promise.all(
      donations.map(async (d) => {
        // If already geocoded (from DB), use those values
        if (d.latitude && d.longitude) {
          return { ...d, lat: Number(d.latitude), lng: Number(d.longitude) };
        }
        // Otherwise geocode from pickupLocation address
        const coords = await geocodeAddress(d.pickupLocation || "Bangalore, India");
        return { ...d, lat: coords.lat, lng: coords.lng };
      })
    )
      .then((enriched) => {
        setDonations(enriched);

        // Build map markers
        const newMarkers: GoogleMapMarker[] = enriched.map((d) => ({
          id: String(d.id),
          label: d.foodName || "Food",
          type:
            d.priority === "high"
              ? "expired"
              : d.freshness === "expiring_soon"
              ? "expiring"
              : "available",
          position: { lat: d.lat!, lng: d.lng! },
        }));

        setMarkers(newMarkers);

        // Center map on first donation if available
        if (enriched.length > 0 && enriched[0].lat && enriched[0].lng) {
          setCenter({ lat: enriched[0].lat!, lng: enriched[0].lng! });
        }
      })
      .catch(console.error)
      .finally(() => setGeocoding(false));
    // Only run when the array length or ids change, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donations.length]);

  const selectedFood = donations.find((d) => String(d.id) === selectedId);

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedId(id);
    const food = donations.find((d) => String(d.id) === id);
    if (food?.lat && food?.lng) {
      setCenter({ lat: food.lat, lng: food.lng });
    }
  }, [donations]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCenter(DEFAULT_CENTER)
    );
  };

  const displayedMarkers = markers; // filtering can be added per activeFilter later

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] lg:h-screen flex flex-col p-4 sm:p-6 lg:p-0">
      {/* Mobile/Tablet Header */}
      <div className="lg:hidden mb-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Food Map</h1>
          <p className="text-muted-foreground">Discover food locations near you</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search area..."
              className="pl-10 h-10 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl lg:rounded-none overflow-hidden border lg:border-0 shadow-inner">
        {/* Real Google Map */}
        <GoogleMap
          height="h-full min-h-[500px]"
          center={center}
          zoom={13}
          markers={displayedMarkers}
          onMarkerClick={handleMarkerClick}
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
                    <Input
                      placeholder="Search locations..."
                      className="pl-10 h-10 rounded-xl bg-background"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {filterTabs.map((tab) => (
                      <Button
                        key={tab}
                        variant={activeFilter === tab ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(tab)}
                        className={`rounded-full h-7 text-[10px] ${
                          activeFilter === tab
                            ? "gradient-sky text-white border-0"
                            : "bg-background"
                        }`}
                      >
                        {tab}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-end gap-3 pointer-events-auto">
              {/* Legend */}
              <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  Available ({donations.filter((d) => d.priority !== "high" && d.freshness !== "expiring_soon").length})
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  Expiring
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
                  Urgent
                </div>
              </div>

              {/* Locate me */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocateMe}
                className="bg-background/95 backdrop-blur-md shadow-xl rounded-full h-9 px-4 flex items-center gap-2"
              >
                <Navigation className="h-4 w-4 text-sky-500" />
                Locate Me
              </Button>

              {/* Geocoding indicator */}
              {geocoding && (
                <div className="bg-background/95 backdrop-blur-md shadow-xl border px-3 py-2 rounded-full flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin text-sky-500" />
                  Geocoding locations…
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Food Popover */}
        {selectedFood && (
          <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:top-24 lg:bottom-auto lg:right-6 lg:w-96 z-40 animate-slide-up lg:animate-slide-in-right">
            <Card className="shadow-2xl border-sky-200 dark:border-sky-800 overflow-hidden">
              <div className="relative h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedFood.imageUrl || selectedFood.image || "/placeholder-food.jpg"}
                  alt={selectedFood.foodName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                  }}
                />
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
                    <MapPin className="h-3 w-3 text-sky-500" /> {selectedFood.distance || "Nearby"}
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
                    <span className="text-sm font-medium text-emerald-600 shrink-0 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                      {selectedFood.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedFood.donorName}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {selectedFood.pickupLocation}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <StatusBadge status={(selectedFood.freshness || "fresh") as any} />
                  <div className="bg-muted px-2 py-1 rounded-lg">
                    <CountdownTimer targetDate={selectedFood.availableUntil} compact />
                  </div>
                </div>

                <Link href={`/receiver/available/${selectedFood.id}`} className="block">
                  <Button className="w-full rounded-xl gradient-sky text-white border-0 shadow-md h-11 hover:opacity-90">
                    View &amp; Claim <ArrowRight className="h-4 w-4 ml-2" />
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
