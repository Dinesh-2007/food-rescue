"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Heart,
  MapPin,
  Bell,
  BarChart3,
  Utensils,
  Upload,
  Users,
  Truck,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
  Package,
  TrendingUp,
} from "lucide-react";

const impactStats = [
  { label: "Meals Saved", value: "125,000+", icon: Utensils, color: "text-sky-500" },
  { label: "Food Rescued (kg)", value: "15,420", icon: Package, color: "text-emerald-500" },
  { label: "Active Donors", value: "450+", icon: Heart, color: "text-rose-500" },
  { label: "Communities Served", value: "85+", icon: Globe, color: "text-violet-500" },
];

const features = [
  {
    icon: Upload,
    title: "Easy Food Donation",
    description: "Upload surplus food in seconds. Our intuitive interface makes donating as easy as posting a photo.",
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  },
  {
    icon: MapPin,
    title: "Nearby Food Discovery",
    description: "Find available food near you with smart location-based search and real-time availability.",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    icon: Bell,
    title: "Smart Radius Notifications",
    description: "Get instant alerts when fresh food becomes available within your preferred radius.",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    icon: Users,
    title: "Community Pickup Locations",
    description: "Convenient community-managed pickup points make food collection safe and organized.",
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    icon: BarChart3,
    title: "Food Waste Analytics",
    description: "Track your impact with beautiful dashboards showing meals saved and CO₂ reduced.",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Donor Uploads Food",
    description: "Restaurants, hotels, and event organizers list surplus food with photos, quantity, and pickup details.",
    icon: Upload,
  },
  {
    step: "02",
    title: "Nearby Receivers Notified",
    description: "Our smart system instantly alerts nearby community members about available food in their area.",
    icon: Bell,
  },
  {
    step: "03",
    title: "Receivers Visit Pickup Point",
    description: "Recipients navigate to the designated community pickup location at the scheduled time.",
    icon: MapPin,
  },
  {
    step: "04",
    title: "Food Gets Distributed",
    description: "Food reaches those who need it most, reducing waste and building stronger communities.",
    icon: Heart,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-up">
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1.5 text-sm font-medium border border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Reducing food waste, one meal at a time
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Rescue Food.{" "}
                <span className="text-gradient">Feed Communities.</span>{" "}
                Reduce Waste.
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Connect surplus food from restaurants, hotels, and events to nearby
                communities before it goes to waste. Join the movement to end food
                waste and hunger.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/donor">
                  <Button
                    size="lg"
                    className="rounded-2xl h-12 px-8 gradient-sky text-white border-0 hover:opacity-90 shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
                  >
                    <Utensils className="h-5 w-5 mr-2" />
                    Donate Food
                  </Button>
                </Link>
                <Link href="/receiver">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl h-12 px-8 border-sky-200 hover:bg-sky-50 dark:border-sky-800 dark:hover:bg-sky-950/30"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Find Food
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {["RK", "PS", "MA", "AD", "SR"].map((initials, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-sky-100 text-sky-700 text-[10px] font-bold dark:bg-sky-900 dark:text-sky-300"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">1,200+</span>{" "}
                  active community members
                </p>
              </div>
            </div>

            {/* Right illustration */}
            <div className="relative hidden lg:block animate-fade-up stagger-2">
              <div className="relative">
                {/* Main card */}
                <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20 p-8 border border-sky-200/50 dark:border-sky-800/50 shadow-2xl">
                  <div className="space-y-6">
                    {/* Food cards preview */}
                    {[
                      { name: "Biryani - Chicken", qty: "50 servings", loc: "MG Road", time: "2h left", emoji: "🍛" },
                      { name: "Fresh Fruit Platter", qty: "20 kg", loc: "Brigade Road", time: "4h left", emoji: "🍎" },
                      { name: "Assorted Sandwiches", qty: "30 pieces", loc: "Whitefield", time: "3h left", emoji: "🥪" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-sky-100 dark:border-sky-800/30 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/30 text-2xl">
                          {item.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.qty} • {item.loc}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] rounded-full shrink-0 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
                          {item.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 animate-float">
                  <div className="flex items-center gap-2 rounded-2xl bg-white dark:bg-card px-4 py-2.5 shadow-xl border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Today</p>
                      <p className="text-sm font-bold">+24 meals</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-2 rounded-2xl bg-white dark:bg-card px-4 py-2.5 shadow-xl border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                      <p className="text-sm font-bold">8.5 tons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2 animate-fade-up">
                <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-1.5 mb-4 text-sm border border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800"
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="text-gradient">rescue food</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform makes it incredibly easy to donate surplus food and connect with nearby communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                className="group border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-4 ${feature.color} transition-transform group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-card border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-1.5 mb-4 text-sm border border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800"
            >
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Four simple steps to rescue food and feed communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-sky-200 dark:border-sky-800" />
                )}
                <div className="relative z-10 space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 group-hover:shadow-lg group-hover:shadow-sky-500/10 transition-all">
                    <step.icon className="h-8 w-8 text-sky-500" />
                  </div>
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full gradient-sky text-white text-xs font-bold shadow-md">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-1.5 mb-4 text-sm border border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800"
            >
              <Heart className="h-3.5 w-3.5 mr-1.5" />
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Making a Real <span className="text-gradient">Difference</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Every donation counts. See how our community is changing the world, one meal at a time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-16 text-white text-center shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-white/80">
                Join thousands of donors and receivers who are already reducing food waste and feeding communities. Start your journey today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="rounded-2xl h-12 px-8 bg-white text-sky-700 hover:bg-white/90 shadow-lg"
                  >
                    Get Started Free
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl h-12 px-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
