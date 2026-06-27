"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  Menu,
  LogOut,
  LayoutDashboard,
  Plus,
  Package,
  Bell,
  User,
  Search,
  History,
  Users,
  BarChart3,
  Settings,
  MapPin,
  ShieldCheck,
  FileText,
  Radio,
  Flag,
  Map,
  Bookmark,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const donorNav: NavItem[] = [
  { label: "Dashboard", href: "/donor", icon: LayoutDashboard },
  { label: "Create Donation", href: "/donor/create", icon: Plus },
  { label: "My Donations", href: "/donor/donations", icon: Package },
  { label: "Donation Analytics", href: "/donor/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/donor/notifications", icon: Bell, badge: 4 },
  { label: "Profile", href: "/donor/profile", icon: User },
  { label: "Settings", href: "/donor/settings", icon: Settings },
];

const receiverNav: NavItem[] = [
  { label: "Dashboard", href: "/receiver", icon: LayoutDashboard },
  { label: "Available Food", href: "/receiver/available", icon: Search },
  { label: "Food Map", href: "/receiver/map", icon: Map },
  { label: "Notifications", href: "/receiver/notifications", icon: Bell, badge: 3 },
  { label: "Collection History", href: "/receiver/history", icon: History },
  { label: "Saved Foods", href: "/receiver/saved", icon: Bookmark },
  { label: "Profile", href: "/receiver/profile", icon: User },
  { label: "Settings", href: "/receiver/settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Donations", href: "/admin/donations", icon: Package },
  { label: "Donors", href: "/admin/donors", icon: Users },
  { label: "Receivers", href: "/admin/receivers", icon: Users },
  { label: "Pickup Locations", href: "/admin/pickup-locations", icon: MapPin },
  { label: "Verification Queue", href: "/admin/verification", icon: ShieldCheck, badge: 3 },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Notification Logs", href: "/admin/notification-logs", icon: Radio },
  { label: "Reports", href: "/admin/reports", icon: Flag, badge: 5 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const roleConfig = {
  donor: { nav: donorNav, name: "Rajesh Kumar", role: "Donor", initials: "RK", businessName: "Grand Palace Banquet" },
  receiver: { nav: receiverNav, name: "Arun Patel", role: "Receiver", initials: "AP" },
  admin: { nav: adminNav, name: "Admin User", role: "Administrator", initials: "AD" },
};

interface DashboardSidebarProps {
  role: "donor" | "receiver" | "admin";
}

function SidebarContent({ role, onNavigate }: { role: "donor" | "receiver" | "admin"; onNavigate?: () => void }) {
  const pathname = usePathname();
  const config = roleConfig[role];

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-sky text-white shadow-md shrink-0">
          <Leaf className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-tight truncate">Smart Food Rescue</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.role} Portal</p>
        </div>
      </div>

      <Separator className="mx-4 w-auto" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {config.nav.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href + "/"));
          const isExactActive = pathname === item.href;
          const finalActive = item.href === `/${role}` ? isExactActive : isActive;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                finalActive
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  finalActive ? "text-sky-500" : ""
                )}
              />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white px-1">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <Separator className="mx-4 w-auto" />

      {/* User */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sky-100 text-sky-700 text-xs font-semibold dark:bg-sky-900 dark:text-sky-300">
              {config.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{config.name}</p>
            <p className="text-xs text-muted-foreground">{config.role}</p>
          </div>
        </div>
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive rounded-xl"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center gap-3 px-4 glass border-b">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-xl shrink-0" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent role={role} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sky text-white">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold">Smart Food Rescue</span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-card">
        <SidebarContent role={role} />
      </aside>
    </>
  );
}
