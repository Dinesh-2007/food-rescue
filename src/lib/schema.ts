import { ApiField } from "./db";

export const userFields: ApiField[] = [
  { id: "name", type: "text" },
  { id: "email", type: "text" },
  { id: "phone", type: "text" },
  { id: "role", type: "select" }, // "donor" | "receiver" | "admin"
  { id: "address", type: "text" },
  { id: "city", type: "text" },
  { id: "latitude", type: "number" },
  { id: "longitude", type: "number" },
  { id: "avatar", type: "text" },
  { id: "joinedDate", type: "datetime-local" },
  { id: "status", type: "select" }, // "active" | "disabled" | "suspended"
  { id: "verificationStatus", type: "select" }, // "verified" | "pending" | "unverified"
  { id: "totalDonations", type: "number" },
  { id: "totalCollections", type: "number" },
  { id: "lastActive", type: "text" },
  { id: "trustScore", type: "number" },
  { id: "completionRate", type: "number" },
  { id: "foodSavedKg", type: "number" },
  { id: "avgMonthlyDonations", type: "number" },
  { id: "businessName", type: "text" },
  { id: "businessCategory", type: "text" },
  { id: "licenseNumber", type: "text" },
  { id: "operatingHours", type: "text" },
  { id: "notificationsReceived", type: "number" },
];

export const donationFields: ApiField[] = [
  { id: "foodName", type: "text" },
  { id: "category", type: "text" },
  { id: "quantity", type: "text" },
  { id: "servings", type: "number" },
  { id: "description", type: "textarea" },
  { id: "image", type: "text" },
  { id: "pickupLocation", type: "text" },
  { id: "availableFrom", type: "datetime-local" },
  { id: "availableUntil", type: "datetime-local" },
  { id: "status", type: "select" }, // "active" | "completed" | "expired" | "cancelled" | "pending"
  { id: "donorName", type: "text" },
  { id: "donorId", type: "number" }, // Should map to a user ID. Our dynamic table uses BIGSERIAL for ID.
  { id: "distance", type: "text" },
  { id: "notificationRadius", type: "number" },
  { id: "currentRadius", type: "number" },
  { id: "receiversNotified", type: "number" },
  { id: "views", type: "number" },
  { id: "expansions", type: "number" },
  { id: "isVeg", type: "checkbox" },
  { id: "temperature", type: "text" },
  { id: "freshness", type: "select" },
  { id: "receiverAssigned", type: "number" },
  { id: "collectedAt", type: "datetime-local" },
  { id: "priority", type: "select" },
  { id: "latitude", type: "number" },
  { id: "longitude", type: "number" },
  { id: "imageUrl", type: "text" },
  { id: "publicId", type: "text" },    // Cloudinary public_id for deletion/replacement
];
