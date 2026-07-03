"use client";

import { use, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { MapPlaceholder } from "@/components/map-placeholder";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { getDonationById, updateDonation } from "@/actions/donations";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Navigation,
  Bookmark,
  Share2,
  Utensils,
  Leaf,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReceiverFoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    async function loadFood() {
      try {
        const data = await getDonationById(Number(id));
        setFood(data);
      } catch (err) {
        console.error("Failed to load food:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFood();
  }, [id]);

  const handleClaim = async () => {
    if (!food) return;
    setIsClaiming(true);
    try {
      await updateDonation(food.id, {
        status: "pending",
        receiverAssigned: 1, // TODO: replace with real logged-in user ID
      });
      setIsClaimed(true);
    } catch (err) {
      console.error("Failed to claim food:", err);
      alert("Failed to claim food. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px] text-muted-foreground animate-pulse">
        Loading food details...
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Food not found</h2>
        <p className="text-muted-foreground mb-6">This donation may have been collected or expired.</p>
        <Link href="/receiver/available">
          <Button className="rounded-xl gradient-sky text-white border-0">Browse Available Food</Button>
        </Link>
      </div>
    );
  }

  if (isClaimed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-center animate-fade-up">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6 shadow-xl shadow-emerald-200/50 dark:shadow-none">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Food Claimed!</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          You have successfully claimed {food.foodName}. The donor has been notified. Please collect it before the expiry time.
        </p>
        <div className="flex gap-4">
          <Link href="/receiver/history">
            <Button variant="outline" className="rounded-xl h-12 px-6">View Collections</Button>
          </Link>
          <Button onClick={() => router.push("/receiver")} className="rounded-xl gradient-sky text-white border-0 h-12 px-6 shadow-md">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/receiver/available">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight truncate pr-4">{food.foodName}</h1>
          <p className="text-muted-foreground">{food.donorName}</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" size="icon" className="rounded-xl h-10 w-10">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl h-10 w-10">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="h-72 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={food.image} alt={food.foodName} className="w-full h-full object-cover" />
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1.5 border border-sky-100 dark:border-sky-900">
                  <MapPin className="h-4 w-4 text-sky-500" /> {food.distance || "Nearby"} Away
                </div>
                {food.priority === "high" && (
                  <div className="bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Zap className="h-4 w-4" /> Urgent Rescue
                  </div>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{food.description || "No description provided."}</p>
            </CardContent>
          </Card>

          {/* Pickup Location Map */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="h-5 w-5 text-sky-500" /> Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{food.pickupLocation?.split(",")[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">{food.pickupLocation}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl shrink-0">
                  <Navigation className="h-3.5 w-3.5 mr-2" /> Get Directions
                </Button>
              </div>
              <MapPlaceholder height="h-64" showLegend={false} locationLabel={food.pickupLocation?.split(",")[0]} markers={[{ id: "1", label: food.foodName, type: "available", position: { top: "50%", left: "50%" } }]} />
            </CardContent>
          </Card>
        </div>

        {/* Right - Sidebar */}
        <div className="space-y-6">
          {/* Claim Card */}
          <Card className="border-sky-200 dark:border-sky-800 shadow-md relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 gradient-sky" />
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Expires In</p>
                <div className="inline-block px-4 py-2 bg-muted/50 rounded-2xl border">
                  <CountdownTimer targetDate={food.availableUntil} showIcon={false} className="text-2xl border-0 bg-transparent p-0" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900">
                  <span className="text-sm font-medium">Quantity</span>
                  <span className="font-bold text-sky-700 dark:text-sky-400">{food.quantity}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900">
                  <span className="text-sm font-medium">Type</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{food.isVeg ? "Vegetarian" : "Non-Veg"}</span>
                </div>
              </div>

              <ConfirmDialog
                title="Claim Food"
                description={`Are you sure you want to claim ${food.quantity} of ${food.foodName}? You will be expected to collect it from ${food.pickupLocation?.split(",")[0]} before it expires.`}
                confirmLabel="Yes, Claim Food"
                variant="default"
                onConfirm={handleClaim}
                trigger={
                  <Button 
                    disabled={isClaiming}
                    className="w-full rounded-xl gradient-sky text-white border-0 shadow-md h-12 text-base font-bold hover:-translate-y-0.5 transition-transform"
                  >
                    {isClaiming ? "Claiming..." : "Claim Food Now"}
                  </Button>
                }
              />
              <p className="text-xs text-center text-muted-foreground">
                By claiming, you commit to picking up the food. Uncollected claims may affect your receiver rating.
              </p>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Food Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{food.category}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Temperature</span>
                <span className="font-medium">{food.temperature || "—"}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">{food.created_at ? new Date(food.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Freshness</span>
                <StatusBadge status={food.freshness} />
              </div>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <Utensils className="h-4 w-4 mx-auto text-sky-500 mb-1.5" />
                  <p className="text-base font-bold">{food.servings || 0}</p>
                  <p className="text-[10px] text-muted-foreground">Meals Saved</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <Leaf className="h-4 w-4 mx-auto text-emerald-500 mb-1.5" />
                  <p className="text-base font-bold">{Math.round((food.servings || 0) * 0.3)}</p>
                  <p className="text-[10px] text-muted-foreground">kg CO₂ Reduced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
