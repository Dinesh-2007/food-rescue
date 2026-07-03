"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { getDonations } from "@/actions/donations";
import {
  Search,
  Eye,
  Trash2,
  Package,
  Filter,
  Edit,
  Star,
  XCircle,
  Radio,
} from "lucide-react";

const filterTabs = ["All", "Today", "Active", "Expired", "Completed", "High Quantity", "Expiring Soon"];

export default function AdminDonationsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [allDonations, setAllDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDonations();
        setAllDonations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = allDonations.filter((d) => {
    if (search && !d.foodName.toLowerCase().includes(search.toLowerCase()) && !d.donorName.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === "Active" && d.status !== "active") return false;
    if (activeFilter === "Expired" && d.status !== "expired") return false;
    if (activeFilter === "Completed" && d.status !== "completed") return false;
    if (activeFilter === "Cancelled" && d.status !== "cancelled") return false;
    if (activeFilter === "High Quantity" && (d.servings || 0) < 50) return false;
    if (activeFilter === "Expiring Soon" && d.freshness !== "expiring_soon" && d.freshness !== "almost_expired") return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donations Management</h1>
          <p className="text-muted-foreground">Operational control center for all platform donations</p>
        </div>
        <Badge variant="secondary" className="rounded-full self-start">
          <Package className="h-3.5 w-3.5 mr-1" />
          {allDonations.length} Total
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by food name, donor, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Food</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Donor</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Qty</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Pickup Location</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Radius</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Available Until</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Views</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Notified</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={10} className="text-center py-8 text-muted-foreground animate-pulse">Loading donations...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={10} className="text-center py-8 text-muted-foreground">No donations found.</td></tr>
                ) : filtered.map((donation) => (
                  <tr key={donation.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={donation.image} alt={donation.foodName} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{donation.foodName}</p>
                          <p className="text-xs text-muted-foreground">{donation.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{donation.donorName}</td>
                    <td className="px-4 py-3 text-sm">{donation.quantity}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-[180px] truncate">{donation.pickupLocation}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Radio className="h-3 w-3 text-sky-500" />
                        <span className="text-sm">{donation.currentRadius || 5} km</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {donation.status === "active" ? (
                        <CountdownTimer targetDate={donation.availableUntil} compact />
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium">{donation.views || 0}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium">{donation.receiversNotified || 0}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={donation.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="View Details">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="Edit">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="Highlight">
                          <Star className="h-3.5 w-3.5" />
                        </Button>
                        {donation.status === "active" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-amber-500" title="Expire">
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-500" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground">Showing {filtered.length} of {allDonations.length} donations</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="rounded-xl gradient-sky text-white border-0">1</Button>
              <Button variant="outline" size="sm" className="rounded-xl">2</Button>
              <Button variant="outline" size="sm" className="rounded-xl">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
