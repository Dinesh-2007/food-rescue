"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Eye,
  EyeOff,
  Utensils,
  HandHeart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    id: "donor" as const,
    label: "Donor",
    description: "Donate surplus food",
    icon: Utensils,
    href: "/donor",
  },
  {
    id: "receiver" as const,
    label: "Receiver",
    description: "Find available food",
    icon: HandHeart,
    href: "/receiver",
  },
  {
    id: "admin" as const,
    label: "Admin",
    description: "Manage platform",
    icon: ShieldCheck,
    href: "/admin",
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"donor" | "receiver" | "admin">("donor");
  const [showPassword, setShowPassword] = useState(false);

  const selectedRoleObj = roles.find((r) => r.id === selectedRole)!;

  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-white/3" />

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Leaf className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">Smart Food Rescue</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Welcome back to the food rescue community
          </h1>

          <p className="text-lg text-white/70 leading-relaxed">
            Sign in to continue your journey of reducing food waste and feeding communities. Every action counts.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { label: "Meals Saved", value: "125K+" },
              { label: "Active Donors", value: "450+" },
              { label: "Communities", value: "85+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-sky text-white shadow-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Smart Food Rescue</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-muted-foreground mt-1">
              Choose your role and enter your credentials
            </p>
          </div>

          {/* Role selection */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                  selectedRole === role.id
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30 shadow-md"
                    : "border-border hover:border-sky-300 hover:bg-accent"
                )}
              >
                <role.icon
                  className={cn(
                    "h-6 w-6",
                    selectedRole === role.id ? "text-sky-500" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    selectedRole === role.id ? "text-sky-700 dark:text-sky-300" : "text-muted-foreground"
                  )}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          {/* Login form */}
          <Card className="border shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-xs text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Link href={selectedRoleObj.href}>
                <Button className="w-full h-11 rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md mt-2">
                  Sign In as {selectedRoleObj.label}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
