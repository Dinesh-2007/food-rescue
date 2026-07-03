"use server";

/**
 * Geocodes an address string into {lat, lng} using the Google Maps Geocoding API.
 * Falls back to the Koramangala, Bangalore coords on failure.
 */
export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number }> {
  const FALLBACK = { lat: 12.9352, lng: 77.6245 }; // Koramangala, Bangalore

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return FALLBACK;
  if (!address?.trim()) return FALLBACK;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache for 1 hr
    if (!res.ok) return FALLBACK;

    const json = await res.json();
    if (json.status === "OK" && json.results?.[0]?.geometry?.location) {
      return json.results[0].geometry.location as { lat: number; lng: number };
    }
  } catch {
    // silent – return fallback
  }

  return FALLBACK;
}

/**
 * Reverse geocodes {lat, lng} into an address string using the Google Maps Geocoding API.
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return "";

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return "";

    const json = await res.json();
    if (json.status === "OK" && json.results?.[0]?.formatted_address) {
      return json.results[0].formatted_address;
    }
  } catch {
    // silent
  }
  return "";
}
