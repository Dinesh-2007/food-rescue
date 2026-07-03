"use client";

import { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  ChefHat,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Info,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createDonation } from "@/actions/donations";
import { reverseGeocode, geocodeAddress } from "@/actions/geocode";
import type { GoogleMapMarker } from "@/components/google-map";
import { ImageUploader, type UploadedImage } from "@/components/ui/ImageUploader";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

// ─── Dynamic imports ──────────────────────────────────────────────────────────

const GoogleMap = dynamic(() => import("@/components/google-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[300px] bg-slate-100 dark:bg-slate-900 flex items-center justify-center rounded-xl">
      <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
    </div>
  ),
});

// ─── Steps ────────────────────────────────────────────────────────────────────

const steps = [
  { id: 1, title: "Food Details", icon: ChefHat },
  { id: 2, title: "Photo", icon: Camera },
  { id: 3, title: "Pickup Info", icon: MapPin },
  { id: 4, title: "Review", icon: CheckCircle2 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateDonationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    isVeg: false,
    quantity: "",
    servings: 0,
    temperature: "",
    description: "",
    availableFrom: "18:00",
    availableUntil: "22:00",
    // Image — Cloudinary URLs only
    imageUrl: "",
    publicId: "",
    // Legacy `image` field kept in sync for display fallback
    image: "",
    // Location
    pickupLocation: "Grand Palace Banquet, 123 MG Road, Bangalore",
    latitude: 12.9352,
    longitude: 77.6245,
    // Meta
    donorName: "Rajesh Kumar",
    donorId: 1,
    status: "active",
    notificationRadius: 5,
    currentRadius: 5,
    receiversNotified: 0,
    views: 0,
    expansions: 0,
    freshness: "fresh",
    priority: "medium",
  });

  const updateForm = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ── Image upload callback ──────────────────────────────────────────────────

  const handleUploadSuccess = ({ imageUrl, publicId }: UploadedImage) => {
    updateForm("imageUrl", imageUrl);
    updateForm("publicId", publicId);
    updateForm("image", imageUrl); // keep legacy field in sync
  };

  const handleImageClear = () => {
    updateForm("imageUrl", "");
    updateForm("publicId", "");
    updateForm("image", "");
  };

  // ── Map / geocoding ────────────────────────────────────────────────────────

  const handleMapClick = async (lat: number, lng: number) => {
    updateForm("latitude", lat);
    updateForm("longitude", lng);
    setIsLocating(true);
    try {
      const address = await reverseGeocode(lat, lng);
      if (address) updateForm("pickupLocation", address);
    } finally {
      setIsLocating(false);
    }
  };

  const handleAddressBlur = async () => {
    if (!formData.pickupLocation) return;
    setIsLocating(true);
    try {
      const { lat, lng } = await geocodeAddress(formData.pickupLocation);
      updateForm("latitude", lat);
      updateForm("longitude", lng);
    } finally {
      setIsLocating(false);
    }
  };

  // ── Navigation ──────────────────────────────────────────────────────────────

  const handleNext = () => setStep((s) => Math.min(4, s + 1));
  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get the local date in YYYY-MM-DD format to prevent timezone offset expiration bugs
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const today = `${year}-${month}-${day}`;
      
      const dataToSubmit = {
        ...formData,
        availableFrom: `${today}T${formData.availableFrom}:00`,
        availableUntil: `${today}T${formData.availableUntil}:00`,
      };
      await createDonation(dataToSubmit);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to create donation:", error);
      alert("Failed to create donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-center animate-fade-up">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mb-6 shadow-xl shadow-emerald-200/50 dark:shadow-none">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Donation Created!</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Your food is now live and receivers within a 5 km radius have been notified. Thank you for making a difference!
        </p>
        <div className="flex gap-4">
          <Link href="/donor/donations">
            <Button variant="outline" className="rounded-xl h-12 px-6">View Donations</Button>
          </Link>
          <Link href="/donor">
            <Button className="rounded-xl gradient-sky text-white border-0 h-12 px-6 shadow-md">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Create Donation</h1>
        <p className="text-muted-foreground">List excess food for immediate rescue</p>
      </div>

      {/* ── Progress Bar ── */}
      <div className="mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-1 gradient-sky -translate-y-1/2 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((s) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-sky-500 border-sky-500 text-white"
                      : isCurrent
                      ? "bg-background border-sky-500 text-sky-500 shadow-md shadow-sky-100 dark:shadow-none"
                      : "bg-background border-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="shadow-lg border-muted/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 sm:p-8 min-h-[400px]">

            {/* ── Step 1: Food Details ── */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-2">
                  <Label>Food Name</Label>
                  <Input
                    placeholder="e.g. Chicken Biryani, Assorted Sandwiches"
                    className="h-12 rounded-xl text-lg"
                    value={formData.foodName}
                    onChange={(e) => updateForm("foodName", e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(v) => updateForm("category", v)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice Dishes</SelectItem>
                        <SelectItem value="main">Main Course</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="dessert">Desserts</SelectItem>
                        <SelectItem value="bakery">Bakery & Bread</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dietary Type</Label>
                    <Select
                      value={formData.isVeg ? "veg" : "non-veg"}
                      onValueChange={(v) => updateForm("isVeg", v === "veg")}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Quantity (Servings)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 50"
                      className="h-12 rounded-xl"
                      value={formData.servings || ""}
                      onChange={(e) => {
                        updateForm("servings", Number(e.target.value));
                        updateForm("quantity", `${e.target.value} servings`);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Temperature</Label>
                    <Select value={formData.temperature} onValueChange={(v) => updateForm("temperature", v)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select temp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot">Hot (above 60°C)</SelectItem>
                        <SelectItem value="room">Room Temperature</SelectItem>
                        <SelectItem value="cold">Refrigerated (below 5°C)</SelectItem>
                        <SelectItem value="frozen">Frozen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description & Ingredients (Optional)</Label>
                  <Textarea
                    placeholder="Any specific details, allergens, or instructions..."
                    className="min-h-[100px] rounded-xl resize-none"
                    value={formData.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ── Step 2: Photo (Cloudinary) ── */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-up">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex gap-3">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    A clear photo increases collection rates by 80%. Images are securely stored on Cloudinary — not on our servers.
                  </p>
                </div>

                <ImageUploader
                  onUploadSuccess={handleUploadSuccess}
                  onClear={handleImageClear}
                  initialImageUrl={formData.imageUrl}
                  initialPublicId={formData.publicId}
                />
              </div>
            )}

            {/* ── Step 3: Pickup Info ── */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-500" /> Location
                  </h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        value={formData.pickupLocation}
                        onChange={(e) => updateForm("pickupLocation", e.target.value)}
                        onBlur={handleAddressBlur}
                        placeholder="Enter pickup address"
                        className="pr-10 h-12 rounded-xl"
                      />
                      {isLocating && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-sky-500" />
                      )}
                    </div>
                    <div className="rounded-xl overflow-hidden border border-sky-100 dark:border-sky-900 shadow-sm relative">
                      <GoogleMap
                        height="h-[250px]"
                        center={{ lat: formData.latitude, lng: formData.longitude }}
                        zoom={15}
                        onMapClick={handleMapClick}
                        markers={[
                          {
                            id: "pickup",
                            label: "Pickup",
                            type: "available",
                            position: { lat: formData.latitude, lng: formData.longitude },
                          },
                        ]}
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur text-xs px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-2">
                        <Info className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span>Click anywhere on the map to adjust the pin location.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-sky-500" /> Availability Window
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Available From</Label>
                      <Input
                        type="time"
                        value={formData.availableFrom}
                        onChange={(e) => updateForm("availableFrom", e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Until</Label>
                      <Input
                        type="time"
                        value={formData.availableUntil}
                        onChange={(e) => updateForm("availableUntil", e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Food will be automatically marked as expired if not collected by the end time.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 4: Review ── */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-up">
                <div className="bg-sky-50 dark:bg-sky-950/20 rounded-2xl p-6 border border-sky-100 dark:border-sky-900">
                  <h3 className="font-semibold text-lg mb-4 text-center">Ready to publish!</h3>

                  <div className="flex gap-4 items-start mb-6">
                    {/* Optimised Cloudinary thumbnail */}
                    <div className="h-24 w-24 rounded-xl bg-muted shrink-0 overflow-hidden border">
                      {formData.imageUrl ? (
                        <CloudinaryImage
                          src={formData.imageUrl}
                          alt={formData.foodName}
                          width={96}
                          height={96}
                          wrapperClassName="w-full h-full"
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs text-center px-2">
                          No photo
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{formData.foodName || "Unnamed Food"}</h4>
                      <p className="text-muted-foreground">
                        {formData.servings} Servings •{" "}
                        {formData.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <Clock className="h-3.5 w-3.5 text-sky-500" />
                        <span>Today, {formData.availableFrom} – {formData.availableUntil}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-card p-3 rounded-xl border text-center">
                      <p className="text-xs text-muted-foreground mb-1">Initial Radius</p>
                      <p className="font-bold text-sky-600">{formData.notificationRadius} km</p>
                    </div>
                    <div className="bg-white dark:bg-card p-3 rounded-xl border text-center">
                      <p className="text-xs text-muted-foreground mb-1">Auto-Expand</p>
                      <p className="font-bold text-emerald-600">Yes</p>
                    </div>
                    <div className="bg-white dark:bg-card p-3 rounded-xl border text-center">
                      <p className="text-xs text-muted-foreground mb-1">Receivers in Area</p>
                      <p className="font-bold text-violet-600">~145</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer Actions ── */}
          <div className="p-6 bg-muted/30 border-t flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1 || isSubmitting}
              className="rounded-xl px-6 h-11"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="rounded-xl px-6 h-11 gradient-sky text-white border-0 shadow-md"
              >
                Continue <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.foodName}
                className={`rounded-xl px-8 h-11 text-white border-0 shadow-md transition-all ${
                  isSubmitting || !formData.foodName
                    ? "bg-muted text-muted-foreground"
                    : "gradient-success hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Publishing...</>
                ) : (
                  "Publish Donation"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
