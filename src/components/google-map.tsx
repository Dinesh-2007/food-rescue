"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin } from "lucide-react";

export type MarkerType = "available" | "expiring" | "expired";

export type GoogleMapMarker = {
  id: string;
  label: string;
  type: MarkerType;
  position: { lat: number; lng: number };
};

const MARKER_COLORS: Record<MarkerType, string> = {
  available: "#22c55e",
  expiring: "#f59e0b",
  expired: "#f43f5e",
};

/** Dark-themed map style – matches the app's dark mode */
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1a1f2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a92a6" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1f2e" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2a3045" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c3450" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#20253a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a4468" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e2436" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a2a1a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1a2e" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#252d44" }] },
];

export default function GoogleMap({
  height = "h-[500px]",
  center,
  zoom = 13,
  markers = [],
  onMarkerClick,
  onMapClick,
}: {
  height?: string;
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: GoogleMapMarker[];
  onMarkerClick?: (id: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
}) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<google.maps.Marker[]>([]);
  const mapClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
      setLoadState("error");
      return;
    }

    // Configure the loader with the API key (idempotent after first call)
    setOptions({ key: apiKey, v: "weekly" });

    // importLibrary loads the script and returns the library namespace
    importLibrary("maps")
      .then((mapsLib) => {
        if (!mapDivRef.current) return;
        const { Map: GoogleMapsMap } = mapsLib as google.maps.MapsLibrary;

        // Create map once
        if (!mapRef.current) {
          mapRef.current = new GoogleMapsMap(mapDivRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            styles: MAP_STYLES,
          });
        } else {
          mapRef.current.setCenter(center);
          mapRef.current.setZoom(zoom);
        }
        
        if (mapClickListenerRef.current) {
          google.maps.event.removeListener(mapClickListenerRef.current);
        }
        
        mapClickListenerRef.current = mapRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
          if (e.latLng && onMapClick) {
            onMapClick(e.latLng.lat(), e.latLng.lng());
          }
        });

        setLoadState("ready");

        // Clear old markers
        markerRefs.current.forEach((m) => m.setMap(null));
        markerRefs.current = [];

        // Add new markers
        markers.forEach((m) => {
          const color = MARKER_COLORS[m.type];

          const marker = new google.maps.Marker({
            map: mapRef.current!,
            position: m.position,
            title: m.label,
            icon: {
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: color,
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 1.5,
              scale: 1.6,
              anchor: new google.maps.Point(12, 22),
            } as google.maps.Symbol,
            animation: google.maps.Animation.DROP,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="font-family:system-ui,sans-serif;padding:6px 2px;min-width:120px">
                <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#111">${m.label}</div>
                <div style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;
                  background:${color}22;color:${color};border:1px solid ${color}55">
                  ${m.type === "available" ? "Available" : m.type === "expiring" ? "Expiring Soon" : "Urgent"}
                </div>
              </div>`,
          });

          marker.addListener("mouseover", () => infoWindow.open(mapRef.current!, marker));
          marker.addListener("mouseout", () => infoWindow.close());
          marker.addListener("click", () => {
            infoWindow.open(mapRef.current!, marker);
            onMarkerClick?.(m.id);
          });

          markerRefs.current.push(marker);
        });
      })
      .catch((e: unknown) => {
        console.error("Google Maps load error:", e);
        setLoadState("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center.lat, center.lng, zoom, markers, onMarkerClick]);

  return (
    <div className="relative w-full h-full">
      {/* The actual map container */}
      <div ref={mapDivRef} className={`w-full ${height}`} />

      {/* Loading skeleton */}
      {loadState === "loading" && (
        <div className={`absolute inset-0 ${height} bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex flex-col items-center justify-center gap-4 animate-pulse`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/20 border border-sky-500/30">
            <MapPin className="h-8 w-8 text-sky-400" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-slate-300 font-medium">Loading Map…</p>
            <p className="text-slate-500 text-sm">Connecting to Google Maps</p>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-sky-500/60 animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {loadState === "error" && (
        <div className={`absolute inset-0 ${height} bg-slate-900 flex flex-col items-center justify-center gap-3 text-center px-4`}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/30">
            <MapPin className="h-7 w-7 text-rose-400" />
          </div>
          <p className="text-slate-300 font-semibold">Map unavailable</p>
          <p className="text-slate-500 text-sm">Check your internet connection or API key.</p>
        </div>
      )}
    </div>
  );
}
