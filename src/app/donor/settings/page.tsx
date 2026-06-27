"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Bell, Shield, MapPin, Building2, User, Mail, Phone } from "lucide-react";

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

export default function DonorSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Business Profile */}
        <SettingsSection icon={Building2} title="Business Profile">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldRow label="Business Name">
              <Input defaultValue="Grand Palace Banquet" className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Business Category">
              <Input defaultValue="Banquet Hall" className="h-11 rounded-xl" />
            </FieldRow>
          </div>
          <FieldRow label="FSSAI License Number" description="Required for verification">
            <Input defaultValue="BLR-BQ-2024-001" className="h-11 rounded-xl max-w-md" />
          </FieldRow>
          <FieldRow label="Operating Hours">
            <Input defaultValue="10:00 AM - 11:00 PM" className="h-11 rounded-xl max-w-md" />
          </FieldRow>
        </SettingsSection>

        {/* Contact Information */}
        <SettingsSection icon={User} title="Contact Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldRow label="Contact Person">
              <Input defaultValue="Rajesh Kumar" className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Email Address">
              <Input defaultValue="rajesh@grandpalace.com" type="email" className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Phone Number">
              <Input defaultValue="+91 98765 43210" type="tel" className="h-11 rounded-xl" />
            </FieldRow>
          </div>
          <FieldRow label="Pickup Address">
            <Input defaultValue="Grand Palace Hall, MG Road" className="h-11 rounded-xl" />
          </FieldRow>
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldRow label="City">
              <Input defaultValue="Bangalore" className="h-11 rounded-xl" />
            </FieldRow>
            <FieldRow label="Pincode">
              <Input defaultValue="560001" className="h-11 rounded-xl" />
            </FieldRow>
          </div>
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection icon={Bell} title="Notification Preferences">
          <Toggle label="Push Notifications" description="Receive alerts when a receiver accepts your donation" defaultChecked={true} />
          <Toggle label="Email Summaries" description="Get weekly impact reports via email" defaultChecked={true} />
          <Toggle label="SMS Alerts" description="Get instant SMS when food is about to expire" defaultChecked={false} />
          <Toggle label="Auto-Expand Radius" description="Automatically increase notification radius if no receivers accept" defaultChecked={true} />
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection icon={Shield} title="Privacy & Security">
          <Toggle label="Public Profile" description="Allow other users to see your business profile and impact" defaultChecked={true} />
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
