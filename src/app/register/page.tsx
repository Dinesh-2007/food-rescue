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
  Check,
  MapPin,
  Loader2,
} from "lucide-react";
import { geocodeAddress } from "@/actions/geocode";

const roles = [
  {
    id: "donor" as const,
    label: "Donor",
    description: "Restaurants, hotels, caterers",
    icon: Utensils,
  },
  {
    id: "receiver" as const,
    label: "Receiver",
    description: "Community members",
    icon: HandHeart,
  },
  {
    id: "admin" as const,
    label: "Admin",
    description: "Platform managers",
    icon: ShieldCheck,
  },
];

const benefits = [
  "Reduce food waste in your community",
  "Connect with nearby donors and receivers",
  "Track your impact with detailed analytics",
  "Get notified about available food nearby",
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<"donor" | "receiver" | "admin">("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLocating, setIsLocating] = useState(false);

  const handleAddressBlur = async () => {
    if (!location) return;
    setIsLocating(true);
    try {
      const { lat, lng } = await geocodeAddress(location);
      setLatitude(lat);
      setLongitude(lng);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Leaf className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">Smart Food Rescue</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Join the movement to end food waste
          </h1>

          <p className="text-lg text-white/70 leading-relaxed">
            Create your account and start making an impact today. It takes less than a minute.
          </p>

          <div className="space-y-4 pt-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-6 animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-sky text-white shadow-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Smart Food Rescue</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground mt-1">
              Fill in your details to get started
            </p>
          </div>

          {/* Role selection */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                  selectedRole === role.id
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30 shadow-md"
                    : "border-border hover:border-sky-300 hover:bg-accent"
                )}
              >
                <role.icon
                  className={cn(
                    "h-5 w-5",
                    selectedRole === role.id ? "text-sky-500" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    selectedRole === role.id ? "text-sky-700 dark:text-sky-300" : "text-muted-foreground"
                  )}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          {/* Registration form */}
          <Card className="border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regEmail">Email Address</Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="regPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {selectedRole !== "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Base Location</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onBlur={handleAddressBlur}
                      placeholder={selectedRole === "donor" ? "Restaurant / Business Address" : "City or Neighborhood"}
                      className="h-11 rounded-xl pr-10"
                    />
                    {isLocating ? (
                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-sky-500" />
                    ) : (
                       <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedRole === "receiver" ? "We'll show you food near this location." : "Donations will be picked up from here."}
                  </p>
                </div>
              )}


              <Link href={selectedRole === "admin" ? "/admin" : selectedRole === "receiver" ? "/receiver" : "/donor"}>
                <Button className="w-full h-11 rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md mt-2">
                  Create Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
