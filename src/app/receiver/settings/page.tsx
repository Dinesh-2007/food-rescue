"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Bell, Shield, MapPin, User, Navigation, Utensils, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsers, updateUser } from "@/actions/users";
import { geocodeAddress, reverseGeocode } from "@/actions/geocode";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@/components/google-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center rounded-xl border border-dashed">
      <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
    </div>
  ),
});

function SettingsSection({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="h-5 w-5 text-sky-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}

function FieldRow({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {children}
    </div>
  );
}

function Toggle({ label, description, defaultChecked = false }: { label: string; description?: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border hover:bg-accent/30 transition-colors">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button className={`relative w-11 h-6 rounded-full transition-colors ${defaultChecked ? "bg-sky-500" : "bg-muted"}`} type="button">
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${defaultChecked ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export default function ReceiverSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(12.9352);
  const [lng, setLng] = useState(77.6245);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const users = await getUsers({ role: "receiver" });
        if (users.length > 0) {
          const u = users[0];
          setUser(u);
          if (u.address) setLocation(u.address);
          if (u.latitude) setLat(Number(u.latitude));
          if (u.longitude) setLng(Number(u.longitude));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleAddressBlur = async () => {
    if (!location) return;
    setIsLocating(true);
    try {
      const coords = await geocodeAddress(location);
      setLat(coords.lat);
      setLng(coords.lng);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLocating(false);
    }
  };

  const handleMapClick = async (clickedLat: number, clickedLng: number) => {
    setLat(clickedLat);
    setLng(clickedLng);
    setIsLocating(true);
    try {
      const addressStr = await reverseGeocode(clickedLat, clickedLng);
      setLocation(addressStr);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUser(user.id, {
        address: location,
        latitude: lat,
        longitude: lng,
      });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-sky-500" /></div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and alerts</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <SettingsSection icon={User} title="Personal Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldRow label="Full Name">
              <Input defaultValue={user?.name || "Guest"} className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Email Address">
              <Input defaultValue={user?.email || ""} type="email" className="h-11 rounded-xl" />
            </FieldRow>
          </div>
          <FieldRow label="Phone Number" description="Used for urgent pickup coordination">
            <Input defaultValue={user?.phone || ""} type="tel" className="h-11 rounded-xl max-w-md" />
          </FieldRow>
        </SettingsSection>

        {/* Smart Zone Settings */}
        <SettingsSection icon={Navigation} title="Smart Notification Zone">
          <FieldRow label="Primary Base Location" description="Center point for your search radius">
            <div className="relative mb-4">
              <Input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                onBlur={handleAddressBlur}
                className="h-11 rounded-xl pr-10" 
              />
              {isLocating ? (
                 <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-sky-500" />
              ) : (
                 <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            
            <div className="mt-4 border rounded-xl overflow-hidden shadow-sm relative">
              <GoogleMap 
                height="h-[300px]" 
                center={{ lat, lng }} 
                zoom={14} 
                markers={[{ id: "me", label: "My Location", type: "available", position: { lat, lng } }]}
                onMapClick={(e: any) => handleMapClick(e.latLng.lat(), e.latLng.lng())}
              />
              <div className="absolute top-2 left-2 bg-background/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-medium border shadow-sm flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-sky-500" />
                Drag or click to update
              </div>
            </div>
          </FieldRow>
          <FieldRow label="Notification Radius" description="You will only be alerted for food within this distance">
            <div className="flex items-center gap-2 max-w-xs">
              <Input defaultValue="5" type="number" className="h-11 rounded-xl" />
              <span className="text-sm text-muted-foreground">km</span>
            </div>
          </FieldRow>
          <Toggle label="Dynamic Radius" description="Temporarily expand radius when nearby food is scarce" defaultChecked={true} />
        </SettingsSection>

        {/* Food Preferences */}
        <SettingsSection icon={Utensils} title="Food Preferences">
          <FieldRow label="Dietary Requirement">
            <Select defaultValue="any">
              <SelectTrigger className="h-11 rounded-xl max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any (No restrictions)</SelectItem>
                <SelectItem value="veg">Vegetarian Only</SelectItem>
                <SelectItem value="vegan">Vegan Only</SelectItem>
                <SelectItem value="halal">Halal</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
          <Toggle label="Urgent Priority Alerts" description="Get immediately notified for highly perishable food" defaultChecked={true} />
        </SettingsSection>

        {/* Notification Preferences */}
        <SettingsSection icon={Bell} title="Alert Preferences">
          <Toggle label="Push Notifications" description="Receive instant alerts on your device" defaultChecked={true} />
          <Toggle label="SMS Alerts" description="Get SMS for urgent or high-priority matches" defaultChecked={true} />
          <Toggle label="Weekly Impact Report" description="Receive an email summarizing your rescues" defaultChecked={false} />
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection icon={Shield} title="Privacy & Security">
          <Toggle label="Share Location" description="Allow app to use your precise location for better matching" defaultChecked={true} />
          <FieldRow label="Change Password">
            <div className="flex gap-2">
              <Input placeholder="New password" type="password" className="h-11 rounded-xl flex-1 max-w-xs" />
              <Button variant="outline" className="h-11 rounded-xl">Update</Button>
            </div>
          </FieldRow>
        </SettingsSection>
      </div>
    </div>
  );
}
