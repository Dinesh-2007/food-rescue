import { ReceiverStatsGrid } from "./receiver-stats-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import GoogleMap from "@/components/google-map";
import { getDonations } from "@/actions/donations";
import { getUsers } from "@/actions/users";
import {
  MapPin,
  ArrowUpRight,
  Navigation,
  Search,
  Bookmark,
  Radio,
  Utensils,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default async function ReceiverDashboard() {
  let nearbyFood: any[] = [];
  let myHistory: any[] = [];
  let me = null;

  try {
    const receivers = await getUsers({ role: "receiver" });
    if (receivers.length > 0) me = receivers[0];

    nearbyFood = await getDonations({ status: "active" });
    nearbyFood = nearbyFood
      .sort((a, b) => parseFloat(a.distance || "0") - parseFloat(b.distance || "0"))
      .slice(0, 4);
      
    myHistory = await getDonations({ status: "completed" });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  const savedMeals = myHistory.length * 10; 
  const co2Saved = Math.round(savedMeals * 0.3);

  const centerLat = me?.latitude || 12.9352;
  const centerLng = me?.longitude || 77.6245;
  const locationLabel = me?.address || me?.city || "Koramangala, Bangalore";

  const mapMarkers = nearbyFood.map((food: any) => ({
    id: String(food.id),
    label: food.foodName,
    type: food.freshness || "available",
    position: { lat: food.latitude || centerLat, lng: food.longitude || centerLng },
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hi, {me ? me.name : "Guest"}! 👋</h1>
          <p className="text-muted-foreground">
            Find and rescue food near {me ? me.city : "you"} • {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/receiver/map">
            <Button variant="outline" className="rounded-xl h-11">
              <MapPin className="h-4 w-4 mr-2" /> Food Map
            </Button>
          </Link>
          <Link href="/receiver/available">
            <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md h-11">
              <Search className="h-4 w-4 mr-2" /> Find Food
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <ReceiverStatsGrid
        nearbyFoodCount={nearbyFood.length}
        postedToday={nearbyFood.length} // approx
        savedMeals={savedMeals}
        co2Saved={co2Saved}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Food List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5 text-sky-500" />
              Available Nearby
            </CardTitle>
            <Link href="/receiver/available">
              <Button variant="ghost" size="sm" className="text-sky-600 rounded-xl">
                View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyFood.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No food available nearby at the moment.
              </div>
            ) : (
              nearbyFood.map((food: any, i) => (
                <div
                  key={food.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border hover:shadow-md transition-all duration-300 animate-slide-up bg-card hover:bg-accent/30"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="h-20 w-20 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={food.image} alt={food.foodName} className="h-full w-full object-cover" />
                    <div className="absolute top-1 left-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm p-1 rounded-md text-[10px] font-bold">
                      {food.distance || "5km"}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-base truncate pr-2">{food.foodName}</h3>
                      <div className="shrink-0 flex items-center gap-2">
                         {food.priority === "high" && <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" title="High Priority" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{food.quantity}</span>
                      <span>•</span>
                      <span className="truncate">{food.donorName}</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
                      <StatusBadge status={food.freshness} />
                      <CountdownTimer targetDate={food.availableUntil} compact />
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                    <Link href={`/receiver/available/${food.id}`} className="flex-1 sm:w-full">
                      <Button className="w-full rounded-xl text-xs gradient-sky text-white border-0 shadow-md h-8">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl shrink-0 text-muted-foreground hover:text-sky-500">
                      <Bookmark className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Live Map Preview & Quick Actions */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-sky-50/50 dark:bg-sky-950/20 border-b p-4">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-sky-500" />
                  Live Map View
                </span>
                <span className="text-xs font-normal text-muted-foreground">{locationLabel}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <GoogleMap
                height="h-[250px]"
                center={{ lat: centerLat, lng: centerLng }}
                zoom={14}
                markers={mapMarkers}
              />
            </CardContent>
          </Card>

          <Card>
             <CardHeader className="pb-3">
               <CardTitle className="text-sm">Smart Notification Zone</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900 flex items-start gap-3">
                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900 text-sky-600 shrink-0">
                   <Radio className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-sm font-medium">You are in the active zone</p>
                   <p className="text-xs text-muted-foreground mt-0.5">Receiving alerts within 5km</p>
                 </div>
               </div>
               <Link href="/receiver/settings">
                 <Button variant="outline" className="w-full rounded-xl text-xs h-9">
                   Adjust Notification Settings
                 </Button>
               </Link>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
