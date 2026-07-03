"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { EmptyState } from "@/components/empty-state";
import { getDonations } from "@/actions/donations";
import {
  Bookmark,
  MapPin,
  ArrowRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function ReceiverSavedPage() {
  const [savedFood, setSavedFood] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Shows active donations as "saved" — in future, a dedicated saved/bookmarks table would be used
        const data = await getDonations({ status: "active" });
        setSavedFood(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Food</h1>
        <p className="text-muted-foreground">Food items you have bookmarked for later</p>
      </div>

      {savedFood.length === 0 ? (
        <EmptyState icon={Bookmark} title="No saved items" description="You haven't bookmarked any food yet. Browse available food to save items." actionLabel="Find Food" actionHref="/receiver/available" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedFood.map((food) => (
            <Card key={food.id} className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border flex flex-col h-full">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={food.image} alt={food.foodName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-sky-500" /> {food.distance}
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md">
                  <Trash2 className="h-4 w-4" />
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
                </div>

                {/* Actions */}
                <Link href={`/receiver/available/${food.id}`} className="mt-auto">
                  <Button className="w-full rounded-xl gradient-sky text-white border-0 shadow-md h-10 hover:opacity-90 transition-opacity">
                    View & Claim <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
