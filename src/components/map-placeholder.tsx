"use client";

import { cn } from "@/lib/utils";
import { MapPin, Navigation } from "lucide-react";

interface MapMarker {
  id: string;
  label: string;
  type: "available" | "expiring" | "expired";
  position: { top: string; left: string };
}

interface MapPlaceholderProps {
  markers?: MapMarker[];
  height?: string;
  className?: string;
  showLegend?: boolean;
  locationLabel?: string;
  onMarkerClick?: (id: string) => void;
}

const defaultMarkers: MapMarker[] = [
  { id: "1", label: "Biryani", type: "available", position: { top: "30%", left: "40%" } },
  { id: "2", label: "Sandwiches", type: "available", position: { top: "50%", left: "65%" } },
  { id: "3", label: "Fruits", type: "expiring", position: { top: "25%", left: "70%" } },
  { id: "4", label: "Pasta", type: "available", position: { top: "60%", left: "30%" } },
  { id: "5", label: "Sweets", type: "expired", position: { top: "70%", left: "55%" } },
  { id: "6", label: "Paneer", type: "available", position: { top: "45%", left: "48%" } },
];

const markerColors = {
  available: "bg-emerald-500 border-emerald-600 shadow-emerald-500/30",
  expiring: "bg-amber-500 border-amber-600 shadow-amber-500/30",
  expired: "bg-rose-500 border-rose-600 shadow-rose-500/30",
};

const markerPulse = {
  available: "bg-emerald-400",
  expiring: "bg-amber-400",
  expired: "bg-rose-400",
};

export function MapPlaceholder({
  markers = defaultMarkers,
  height = "h-80",
  className,
  showLegend = true,
  locationLabel = "Koramangala, Bangalore",
  onMarkerClick,
}: MapPlaceholderProps) {
  return (
    <div className={cn("relative rounded-2xl overflow-hidden border", className)}>
      {/* Map Background */}
      <div
        className={cn(
          height,
          "relative bg-gradient-to-br from-sky-50/80 via-emerald-50/30 to-sky-100/50 dark:from-sky-950/30 dark:via-emerald-950/10 dark:to-sky-900/20"
        )}
      >
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-[0.15]">
          {/* Horizontal lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-sky-400"
              style={{ top: `${(i + 1) * 12}%` }}
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-sky-400"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
          {/* Curved "road" lines */}
          <div className="absolute top-[20%] left-0 right-0 h-1 bg-sky-300 rotate-[-5deg]" />
          <div className="absolute top-[55%] left-0 right-0 h-1 bg-sky-300 rotate-[3deg]" />
          <div className="absolute top-0 bottom-0 left-[35%] w-1 bg-sky-300 rotate-[8deg]" />
          <div className="absolute top-0 bottom-0 left-[70%] w-1 bg-sky-300 rotate-[-4deg]" />
        </div>

        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full border-2 border-dashed border-sky-300/40 animate-pulse-slow" />
            <div className="absolute -inset-16 rounded-full border border-dashed border-sky-200/30" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 border-2 border-white">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Markers */}
        {markers.map((marker) => (
          <button
            key={marker.id}
            onClick={() => onMarkerClick?.(marker.id)}
            className={cn(
              "absolute z-20 group cursor-pointer transition-transform hover:scale-125",
            )}
            style={{ top: marker.position.top, left: marker.position.left }}
          >
            <div className="relative">
              {/* Pulse */}
              <div
                className={cn(
                  "absolute -inset-2 rounded-full opacity-30 animate-ping",
                  markerPulse[marker.type]
                )}
                style={{ animationDuration: "3s" }}
              />
              {/* Pin */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-lg",
                  markerColors[marker.type]
                )}
              >
                <MapPin className="h-3 w-3 text-white" />
              </div>
              {/* Label */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="bg-card text-foreground text-[10px] font-medium px-2 py-0.5 rounded-md shadow-md border whitespace-nowrap">
                  {marker.label}
                </span>
              </div>
            </div>
          </button>
        ))}

        {/* Location badge */}
        <div className="absolute top-3 left-3 z-30">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md border text-xs font-medium">
            <MapPin className="h-3 w-3 text-sky-500" />
            {locationLabel}
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center gap-4 px-4 py-2.5 bg-card border-t text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Expiring Soon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="text-muted-foreground">Almost Expired</span>
          </div>
        </div>
      )}
    </div>
  );
}
