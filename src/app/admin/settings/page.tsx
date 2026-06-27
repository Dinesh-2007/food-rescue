"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Save,
  Mail,
  Map,
  Cloud,
  Radio,
  Package,
  Lock,
  Eye,
} from "lucide-react";

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
      <button
        className={`relative w-11 h-6 rounded-full transition-colors ${defaultChecked ? "bg-sky-500" : "bg-muted"}`}
        type="button"
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${defaultChecked ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and integrations</p>
        </div>
        <Button className="rounded-xl gradient-sky text-white border-0 hover:opacity-90 shadow-md">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General */}
        <SettingsSection icon={Globe} title="General">
          <FieldRow label="Platform Name">
            <Input defaultValue="Smart Food Rescue Network" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Support Email">
            <Input defaultValue="support@foodrescue.in" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Default City">
            <Input defaultValue="Bangalore" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Contact Phone">
            <Input defaultValue="+91 80 1234 5678" className="h-11 rounded-xl" />
          </FieldRow>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection icon={Radio} title="Notification Settings">
          <FieldRow label="Initial Notification Radius" description="First radius used when a donation is posted">
            <div className="flex items-center gap-2">
              <Input defaultValue="5" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">km</span>
            </div>
          </FieldRow>
          <FieldRow label="Radius Expansion Interval">
            <div className="flex items-center gap-2">
              <Input defaultValue="10" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </FieldRow>
          <FieldRow label="Maximum Radius">
            <div className="flex items-center gap-2">
              <Input defaultValue="20" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">km</span>
            </div>
          </FieldRow>
          <Toggle label="Enable Smart Expansion" description="Automatically expand radius if no response" defaultChecked={true} />
        </SettingsSection>

        {/* Donation Rules */}
        <SettingsSection icon={Package} title="Donation Rules">
          <FieldRow label="Default Availability Duration">
            <div className="flex items-center gap-2">
              <Input defaultValue="4" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </FieldRow>
          <FieldRow label="Maximum Donation Quantity">
            <div className="flex items-center gap-2">
              <Input defaultValue="500" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">servings</span>
            </div>
          </FieldRow>
          <FieldRow label="Food Expiry Buffer">
            <div className="flex items-center gap-2">
              <Input defaultValue="30" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </FieldRow>
          <Toggle label="Auto Expire Donations" description="Automatically expire donations past their availability time" defaultChecked={true} />
        </SettingsSection>

        {/* Google Maps */}
        <SettingsSection icon={Map} title="Google Maps">
          <FieldRow label="API Key">
            <Input defaultValue="AIza*********************" type="password" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Default City">
            <Input defaultValue="Bangalore, Karnataka" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Map Zoom Level">
            <Input defaultValue="13" type="number" className="h-11 rounded-xl w-24" />
          </FieldRow>
          <FieldRow label="Default Search Radius">
            <div className="flex items-center gap-2">
              <Input defaultValue="10" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">km</span>
            </div>
          </FieldRow>
        </SettingsSection>

        {/* Cloudinary */}
        <SettingsSection icon={Cloud} title="Cloudinary">
          <FieldRow label="Cloud Name">
            <Input defaultValue="food-rescue-network" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="API Key">
            <Input defaultValue="123456789012345" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Folder Name">
            <Input defaultValue="donations" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Max Upload Size">
            <div className="flex items-center gap-2">
              <Input defaultValue="5" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">MB</span>
            </div>
          </FieldRow>
          <Toggle label="Image Compression" description="Automatically compress uploaded images" defaultChecked={true} />
        </SettingsSection>

        {/* Email Configuration */}
        <SettingsSection icon={Mail} title="Email Configuration">
          <FieldRow label="SMTP Host">
            <Input defaultValue="smtp.gmail.com" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="SMTP Port">
            <Input defaultValue="587" className="h-11 rounded-xl w-24" />
          </FieldRow>
          <FieldRow label="Sender Email">
            <Input defaultValue="noreply@foodrescue.in" className="h-11 rounded-xl" />
          </FieldRow>
        </SettingsSection>

        {/* Moderation */}
        <SettingsSection icon={Shield} title="Moderation">
          <Toggle label="Require Donor Verification" description="New donors must be verified before posting" defaultChecked={true} />
          <Toggle label="Auto Remove Expired Donations" description="Automatically remove expired listings from search" defaultChecked={true} />
          <FieldRow label="Max Active Donations Per Donor">
            <Input defaultValue="10" type="number" className="h-11 rounded-xl w-24" />
          </FieldRow>
          <Toggle label="Spam Detection" description="Enable AI-based spam detection for listings" defaultChecked={true} />
          <Toggle label="Blocked Words Filter" description="Filter listings containing inappropriate content" defaultChecked={true} />
        </SettingsSection>

        {/* Security */}
        <SettingsSection icon={Lock} title="Security">
          <FieldRow label="Session Timeout">
            <div className="flex items-center gap-2">
              <Input defaultValue="30" type="number" className="h-11 rounded-xl w-24" />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </FieldRow>
          <FieldRow label="Maximum Login Attempts">
            <Input defaultValue="5" type="number" className="h-11 rounded-xl w-24" />
          </FieldRow>
          <Toggle label="Two-Factor Authentication" description="Require 2FA for admin accounts" defaultChecked={false} />
          <FieldRow label="Password Policy">
            <Select defaultValue="strong">
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                <SelectItem value="moderate">Moderate (8+ chars, mixed case)</SelectItem>
                <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
        </SettingsSection>
      </div>
    </div>
  );
}
