"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { EmptyState } from "@/components/empty-state";
import { getDonations } from "@/actions/donations";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Copy,
  Clock,
  Share2,
  Package,
  Radio,
  Users,
  Timer,
} from "lucide-react";
import Link from "next/link";

const filterTabs = ["All", "Today", "Active", "Completed", "Expired", "Cancelled"];

export default function DonorDonationsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [myDonations, setMyDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDonations(); // We'll just fetch all and filter client side for now
        setMyDonations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = myDonations.filter((d) => {
    if (search && !d.foodName.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === "Active" && d.status !== "active") return false;
    if (activeFilter === "Completed" && d.status !== "completed") return false;
    if (activeFilter === "Expired" && d.status !== "expired") return false;
    if (activeFilter === "Cancelled" && d.status !== "cancelled") return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Donations</h1>
        <p className="text-muted-foreground">Manage and track all your food donations</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search donations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
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

      {/* Donation Cards */}
      {loading ? (
        <div className="py-8 text-center text-muted-foreground animate-pulse">Loading donations...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Package} title="No donations found" description="No donations match your current filter." actionLabel="Create Donation" actionHref="/donor/create" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((donation) => (
            <Card key={donation.id} className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={donation.image} alt={donation.foodName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={donation.status} />
                </div>
                {donation.status === "active" && (
                  <div className="absolute bottom-3 left-3">
                    <CountdownTimer targetDate={donation.availableUntil} compact />
                  </div>
                )}
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold truncate">{donation.foodName}</h3>
                  <p className="text-sm text-muted-foreground">{donation.quantity} • {donation.category}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-1.5 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center gap-1">
                      <Radio className="h-3 w-3 text-sky-500" />
                      <span className="text-xs font-medium">{donation.currentRadius || 5}km</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Radius</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs font-medium">{donation.receiversNotified || 0}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Notified</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-3 w-3 text-violet-500" />
                      <span className="text-xs font-medium">{donation.views || 0}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Views</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {donation.pickupLocation}
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Link href={`/donor/donations/${donation.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-xl text-xs h-8">
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl text-rose-500">
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
