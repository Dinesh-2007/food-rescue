"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Bell, Shield, MapPin, User, Navigation, Utensils } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and alerts</p>
        </div>
        <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <SettingsSection icon={User} title="Personal Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldRow label="Full Name">
              <Input defaultValue="Arun Patel" className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Email Address">
              <Input defaultValue="arun.patel@example.com" type="email" className="h-11 rounded-xl" />
            </FieldRow>
          </div>
          <FieldRow label="Phone Number" description="Used for urgent pickup coordination">
            <Input defaultValue="+91 98765 12345" type="tel" className="h-11 rounded-xl max-w-md" />
          </FieldRow>
        </SettingsSection>

        {/* Smart Zone Settings */}
        <SettingsSection icon={Navigation} title="Smart Notification Zone">
          <FieldRow label="Primary Base Location" description="Center point for your search radius">
            <Input defaultValue="Koramangala, Bangalore" className="h-11 rounded-xl" />
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
