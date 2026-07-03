import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { getUsers } from "@/actions/users";
import { getDonations } from "@/actions/donations";
import {
  MapPin,
  Mail,
  Phone,
  Edit,
  Award,
  ShieldCheck,
  CheckCircle2,
  Utensils,
  Leaf,
  Clock,
  Navigation,
} from "lucide-react";

export default async function ReceiverProfilePage() {
  const receivers = await getUsers({ role: "receiver" });
  const me = receivers.length > 0 ? receivers[0] : null;
  const myHistory = await getDonations({ status: "completed" });
  
  const savedMeals = myHistory.length * 10; // estimate
  const co2Saved = Math.round(savedMeals * 0.3); // 300g per meal

  if (!me) {
    return <div className="p-8 text-center text-muted-foreground">No receiver profile found. Please register.</div>;
  }

  const initials = me.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="overflow-hidden border-0 shadow-lg relative">
        <div className="h-32 bg-gradient-to-r from-violet-400 to-sky-400" />
        <CardContent className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-12 mb-6">
            <Avatar className="h-24 w-24 border-4 border-card rounded-2xl shadow-xl">
              <AvatarFallback className="bg-violet-100 text-violet-700 text-2xl font-bold dark:bg-violet-900 dark:text-violet-300">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold truncate">{me.name}</h1>
                <StatusBadge status={me.verificationStatus || "unverified"} />
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                Individual Receiver
              </p>
            </div>
            <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <MapPin className="h-5 w-5 text-sky-500" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{me.city || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Mail className="h-5 w-5 text-sky-500" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{me.email || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Phone className="h-5 w-5 text-sky-500" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{me.phone || "Not set"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="space-y-6">
          {/* Trust Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-sky-500" /> Receiver Reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 rounded-xl border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-muted-foreground mb-1">Pickup Success Rate</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{me.completionRate || 100}%</p>
                <p className="text-xs text-emerald-600/80 mt-1">Excellent Standing</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Identity Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Phone Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4 text-sky-500" /> Avg. Response Time</span>
                  <span className="text-sm font-medium">12 mins</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Food Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Notification Radius</p>
                <p className="text-sm font-medium flex items-center gap-1"><Navigation className="h-3 w-3 text-sky-500" /> 5 km</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dietary Requirement</p>
                <p className="text-sm font-medium">Any (No restrictions)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Preferred Time</p>
                <p className="text-sm font-medium flex items-center gap-1"><Clock className="h-3 w-3" /> Evening (6 PM - 10 PM)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lifetime Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" /> Lifetime Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 text-center">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">{myHistory.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Rescues</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-center">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 mb-2">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{savedMeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Meals Equivalent</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-center">
                  <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 mb-2">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{co2Saved}</p>
                  <p className="text-xs text-muted-foreground mt-1">CO₂ Reduced (kg)</p>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-amber-100 border-4 border-amber-200 text-3xl shadow-sm">🚀</div>
                  <p className="text-xs font-semibold">Swift Rescuer</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 border-4 border-emerald-200 text-3xl shadow-sm">🌿</div>
                  <p className="text-xs font-semibold">Eco Warrior</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-sky-100 border-4 border-sky-200 text-3xl shadow-sm">💯</div>
                  <p className="text-xs font-semibold">Perfect Reliability</p>
                </div>
                <div className="text-center space-y-2 opacity-50 grayscale">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-muted border-4 border-muted-foreground/20 text-3xl">🏆</div>
                  <p className="text-xs font-semibold">Top 5% Receiver</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
