// ============================================================
// Mock Data for Smart Food Rescue Network
// Full enhanced version for all 3 portals
// ============================================================

// ---- Interfaces ----

export interface Donation {
  id: string;
  foodName: string;
  category: string;
  quantity: string;
  servings?: number;
  description: string;
  image: string;
  pickupLocation: string;
  availableFrom: string;
  availableUntil: string;
  status: "active" | "completed" | "expired" | "cancelled" | "pending";
  donorName: string;
  donorId: string;
  createdAt: string;
  distance?: string;
  notificationRadius: number;
  currentRadius: number;
  receiversNotified: number;
  views: number;
  expansions: number;
  isVeg: boolean;
  temperature?: string;
  freshness: "fresh" | "good" | "expiring_soon" | "almost_expired";
  receiverAssigned?: string;
  collectedAt?: string;
  priority: "high" | "medium" | "low";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "donor" | "receiver" | "admin";
  address: string;
  city: string;
  avatar: string;
  joinedDate: string;
  status: "active" | "disabled" | "suspended";
  verificationStatus: "verified" | "pending" | "unverified";
  totalDonations?: number;
  totalCollections?: number;
  lastActive: string;
  trustScore?: number;
  completionRate?: number;
  foodSavedKg?: number;
  avgMonthlyDonations?: number;
  businessName?: string;
  businessCategory?: string;
  licenseNumber?: string;
  operatingHours?: string;
  notificationsReceived?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "new_food" | "expiring" | "pickup" | "system" | "radius_expanded" | "receiver_interested" | "receiver_accepted" | "receiver_arriving" | "collected" | "completed";
  read: boolean;
  createdAt: string;
  icon: string;
  donationId?: string;
  foodImage?: string;
  distance?: string;
  timeRemaining?: string;
  receiverName?: string;
}

export interface PickupLocation {
  id: string;
  name: string;
  type: "temple" | "church" | "mosque" | "community_hall" | "community_center";
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  status: "active" | "disabled";
  dailyCapacity: number;
  contactPerson: string;
  contactPhone: string;
  createdAt: string;
  totalPickups: number;
}

export interface VerificationEntry {
  id: string;
  businessName: string;
  ownerName: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  businessCategory: string;
  documents: string[];
  submittedDate: string;
  status: "pending" | "approved" | "rejected" | "more_info_needed";
  notes?: string;
}

export interface NotificationLog {
  id: string;
  donationId: string;
  donationName: string;
  donorName: string;
  initialRadius: number;
  currentRadius: number;
  usersNotified: number;
  expansionCount: number;
  collectionResult: "collected" | "expired" | "pending" | "cancelled";
  notificationTime: string;
  expansionTimeline: { radius: number; time: string; notified: number }[];
}

export interface Report {
  id: string;
  type: "spam" | "fake_donation" | "complaint" | "expired" | "inactive_user" | "suspicious";
  title: string;
  description: string;
  reportedBy: string;
  reportedUser?: string;
  donationId?: string;
  createdAt: string;
  status: "open" | "resolved" | "dismissed";
  priority: "high" | "medium" | "low";
}

export interface LiveActivity {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "donation_posted" | "notification_sent" | "radius_expanded" | "donation_completed" | "receiver_collected" | "donation_expired" | "user_registered" | "receiver_accepted";
  donationId?: string;
  icon: string;
}

export interface CollectionHistoryItem {
  id: string;
  donationId: string;
  foodName: string;
  foodImage: string;
  quantity: string;
  category: string;
  pickupLocation: string;
  distance: string;
  collectedAt: string;
  donorName: string;
  status: "collected" | "expired" | "cancelled";
}

export interface SavedFood {
  id: string;
  donationId: string;
  foodName: string;
  foodImage: string;
  quantity: string;
  category: string;
  distance: string;
  pickupLocation: string;
  availableUntil: string;
  donorName: string;
  savedAt: string;
}

// ---- Image URLs ----

export const foodImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
];

// ---- Donations ----

export const mockDonations: Donation[] = [
  {
    id: "DON-001",
    foodName: "Biryani - Chicken",
    category: "Rice Dishes",
    quantity: "50 servings",
    servings: 50,
    description: "Freshly prepared chicken biryani from a wedding reception. Packed in hygienic containers.",
    image: foodImages[0],
    pickupLocation: "Grand Palace Hall, MG Road, Bangalore",
    availableFrom: "2026-06-27T18:00:00",
    availableUntil: "2026-06-28T01:00:00",
    status: "active",
    donorName: "Grand Palace Banquet",
    donorId: "USR-D001",
    createdAt: "2026-06-27T17:30:00",
    distance: "1.2 km",
    notificationRadius: 5,
    currentRadius: 8,
    receiversNotified: 34,
    views: 12,
    expansions: 1,
    isVeg: false,
    temperature: "Hot",
    freshness: "fresh",
    priority: "high",
  },
  {
    id: "DON-002",
    foodName: "Assorted Sandwiches",
    category: "Snacks",
    quantity: "30 pieces",
    servings: 30,
    description: "Club sandwiches, veggie wraps, and paninis left from corporate meeting catering.",
    image: foodImages[1],
    pickupLocation: "TechPark Cafeteria, Whitefield, Bangalore",
    availableFrom: "2026-06-27T14:00:00",
    availableUntil: "2026-06-27T21:00:00",
    status: "active",
    donorName: "Byte Cafe",
    donorId: "USR-D002",
    createdAt: "2026-06-27T13:30:00",
    distance: "2.5 km",
    notificationRadius: 5,
    currentRadius: 12,
    receiversNotified: 89,
    views: 28,
    expansions: 2,
    isVeg: true,
    temperature: "Room Temperature",
    freshness: "good",
    priority: "medium",
  },
  {
    id: "DON-003",
    foodName: "Fresh Fruit Platter",
    category: "Fruits",
    quantity: "20 kg",
    servings: 40,
    description: "Seasonal fruits including mangoes, bananas, apples, and grapes from a hotel breakfast buffet.",
    image: foodImages[2],
    pickupLocation: "Taj Gateway, Brigade Road, Bangalore",
    availableFrom: "2026-06-27T11:00:00",
    availableUntil: "2026-06-27T18:30:00",
    status: "active",
    donorName: "Taj Gateway Hotel",
    donorId: "USR-D003",
    createdAt: "2026-06-27T10:30:00",
    distance: "3.1 km",
    notificationRadius: 5,
    currentRadius: 20,
    receiversNotified: 156,
    views: 45,
    expansions: 3,
    isVeg: true,
    temperature: "Cool",
    freshness: "expiring_soon",
    priority: "high",
  },
  {
    id: "DON-004",
    foodName: "Dal & Rice Combo",
    category: "Main Course",
    quantity: "100 servings",
    servings: 100,
    description: "Freshly cooked dal, rice, and chapati from a temple kitchen. Vegetarian and hygienic.",
    image: foodImages[3],
    pickupLocation: "ISKCON Temple, Rajajinagar, Bangalore",
    availableFrom: "2026-06-27T12:00:00",
    availableUntil: "2026-06-27T15:00:00",
    status: "completed",
    donorName: "ISKCON Kitchen",
    donorId: "USR-D004",
    createdAt: "2026-06-27T11:00:00",
    distance: "4.0 km",
    notificationRadius: 5,
    currentRadius: 5,
    receiversNotified: 22,
    views: 18,
    expansions: 0,
    isVeg: true,
    temperature: "Hot",
    freshness: "fresh",
    receiverAssigned: "USR-R003",
    collectedAt: "2026-06-27T13:15:00",
    priority: "medium",
  },
  {
    id: "DON-005",
    foodName: "Wedding Sweets Collection",
    category: "Desserts",
    quantity: "200 pieces",
    servings: 200,
    description: "Assorted Indian sweets - gulab jamun, rasgulla, and barfi from a wedding ceremony.",
    image: foodImages[4],
    pickupLocation: "Kalyana Mantapa, JP Nagar, Bangalore",
    availableFrom: "2026-06-26T20:00:00",
    availableUntil: "2026-06-27T08:00:00",
    status: "expired",
    donorName: "Sharma Marriage Hall",
    donorId: "USR-D005",
    createdAt: "2026-06-26T19:30:00",
    distance: "5.2 km",
    notificationRadius: 5,
    currentRadius: 20,
    receiversNotified: 210,
    views: 65,
    expansions: 3,
    isVeg: true,
    temperature: "Room Temperature",
    freshness: "almost_expired",
    priority: "low",
  },
  {
    id: "DON-006",
    foodName: "Pasta & Garlic Bread",
    category: "Italian",
    quantity: "25 servings",
    servings: 25,
    description: "Penne pasta with marinara sauce and garlic bread from a restaurant closing hour.",
    image: foodImages[5],
    pickupLocation: "Olive Garden, Indiranagar, Bangalore",
    availableFrom: "2026-06-27T21:00:00",
    availableUntil: "2026-06-28T02:00:00",
    status: "active",
    donorName: "Olive Garden Restaurant",
    donorId: "USR-D006",
    createdAt: "2026-06-27T20:30:00",
    distance: "1.8 km",
    notificationRadius: 5,
    currentRadius: 5,
    receiversNotified: 18,
    views: 5,
    expansions: 0,
    isVeg: true,
    temperature: "Warm",
    freshness: "fresh",
    priority: "medium",
  },
  {
    id: "DON-007",
    foodName: "Idli & Sambar",
    category: "Breakfast",
    quantity: "80 servings",
    servings: 80,
    description: "South Indian breakfast combo from a catering event. Includes chutney.",
    image: foodImages[0],
    pickupLocation: "MTR Restaurant, Lalbagh Road, Bangalore",
    availableFrom: "2026-06-27T07:00:00",
    availableUntil: "2026-06-27T11:00:00",
    status: "completed",
    donorName: "MTR Catering",
    donorId: "USR-D001",
    createdAt: "2026-06-27T06:30:00",
    distance: "2.0 km",
    notificationRadius: 5,
    currentRadius: 8,
    receiversNotified: 45,
    views: 32,
    expansions: 1,
    isVeg: true,
    temperature: "Hot",
    freshness: "fresh",
    receiverAssigned: "USR-R001",
    collectedAt: "2026-06-27T08:45:00",
    priority: "medium",
  },
  {
    id: "DON-008",
    foodName: "Mixed Veg Curry",
    category: "Main Course",
    quantity: "40 servings",
    servings: 40,
    description: "Nutritious mixed vegetable curry with roti from a corporate cafeteria.",
    image: foodImages[3],
    pickupLocation: "Infosys Campus Cafeteria, Electronic City",
    availableFrom: "2026-06-27T13:00:00",
    availableUntil: "2026-06-27T19:00:00",
    status: "active",
    donorName: "Corporate Bites",
    donorId: "USR-D002",
    createdAt: "2026-06-27T12:30:00",
    distance: "6.5 km",
    notificationRadius: 5,
    currentRadius: 12,
    receiversNotified: 72,
    views: 19,
    expansions: 2,
    isVeg: true,
    temperature: "Hot",
    freshness: "good",
    priority: "medium",
  },
  {
    id: "DON-009",
    foodName: "Paneer Butter Masala",
    category: "Main Course",
    quantity: "35 servings",
    servings: 35,
    description: "Rich paneer butter masala with naan bread from a restaurant.",
    image: foodImages[5],
    pickupLocation: "Spice Garden, Koramangala, Bangalore",
    availableFrom: "2026-06-27T19:00:00",
    availableUntil: "2026-06-28T00:00:00",
    status: "active",
    donorName: "Spice Garden Restaurant",
    donorId: "USR-D003",
    createdAt: "2026-06-27T18:30:00",
    distance: "0.8 km",
    notificationRadius: 5,
    currentRadius: 5,
    receiversNotified: 15,
    views: 8,
    expansions: 0,
    isVeg: true,
    temperature: "Hot",
    freshness: "fresh",
    priority: "high",
  },
  {
    id: "DON-010",
    foodName: "Chole Bhature",
    category: "North Indian",
    quantity: "60 servings",
    servings: 60,
    description: "Classic North Indian chole bhature from a weekend special event.",
    image: foodImages[4],
    pickupLocation: "Punjab Grill, HSR Layout, Bangalore",
    availableFrom: "2026-06-27T12:00:00",
    availableUntil: "2026-06-27T17:00:00",
    status: "cancelled",
    donorName: "Punjab Grill",
    donorId: "USR-D004",
    createdAt: "2026-06-27T11:30:00",
    distance: "3.5 km",
    notificationRadius: 5,
    currentRadius: 8,
    receiversNotified: 38,
    views: 14,
    expansions: 1,
    isVeg: true,
    temperature: "Hot",
    freshness: "good",
    priority: "medium",
  },
];

// ---- Users ----

export const mockDonors: User[] = [
  {
    id: "USR-D001",
    name: "Rajesh Kumar",
    email: "rajesh@grandpalace.com",
    phone: "+91 98765 43210",
    role: "donor",
    address: "Grand Palace Hall, MG Road, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-03-15",
    status: "active",
    verificationStatus: "verified",
    totalDonations: 45,
    lastActive: "2 hours ago",
    trustScore: 92,
    completionRate: 89,
    foodSavedKg: 1250,
    avgMonthlyDonations: 8,
    businessName: "Grand Palace Banquet",
    businessCategory: "Banquet Hall",
    licenseNumber: "BLR-BQ-2024-001",
    operatingHours: "10:00 AM - 11:00 PM",
  },
  {
    id: "USR-D002",
    name: "Priya Sharma",
    email: "priya@bytecafe.com",
    phone: "+91 87654 32109",
    role: "donor",
    address: "TechPark, Whitefield, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-05-20",
    status: "active",
    verificationStatus: "verified",
    totalDonations: 32,
    lastActive: "5 hours ago",
    trustScore: 88,
    completionRate: 94,
    foodSavedKg: 890,
    avgMonthlyDonations: 6,
    businessName: "Byte Cafe",
    businessCategory: "Restaurant",
    licenseNumber: "BLR-RS-2024-045",
    operatingHours: "8:00 AM - 10:00 PM",
  },
  {
    id: "USR-D003",
    name: "Mohammed Ali",
    email: "mali@tajgateway.com",
    phone: "+91 76543 21098",
    role: "donor",
    address: "Brigade Road, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-01-10",
    status: "active",
    verificationStatus: "verified",
    totalDonations: 67,
    lastActive: "1 hour ago",
    trustScore: 95,
    completionRate: 92,
    foodSavedKg: 2100,
    avgMonthlyDonations: 12,
    businessName: "Taj Gateway Hotel",
    businessCategory: "Hotel",
    licenseNumber: "BLR-HT-2024-012",
    operatingHours: "24 Hours",
  },
  {
    id: "USR-D004",
    name: "Anita Desai",
    email: "anita@iskconkitchen.org",
    phone: "+91 65432 10987",
    role: "donor",
    address: "Rajajinagar, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-07-01",
    status: "active",
    verificationStatus: "verified",
    totalDonations: 120,
    lastActive: "3 hours ago",
    trustScore: 98,
    completionRate: 96,
    foodSavedKg: 4500,
    avgMonthlyDonations: 18,
    businessName: "ISKCON Kitchen",
    businessCategory: "Temple Kitchen",
    licenseNumber: "BLR-TK-2024-003",
    operatingHours: "6:00 AM - 9:00 PM",
  },
  {
    id: "USR-D005",
    name: "Suresh Reddy",
    email: "suresh@sharmahall.com",
    phone: "+91 54321 09876",
    role: "donor",
    address: "JP Nagar, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-09-15",
    status: "suspended",
    verificationStatus: "unverified",
    totalDonations: 15,
    lastActive: "2 weeks ago",
    trustScore: 45,
    completionRate: 60,
    foodSavedKg: 320,
    avgMonthlyDonations: 2,
    businessName: "Sharma Marriage Hall",
    businessCategory: "Marriage Hall",
    licenseNumber: "BLR-MH-2024-078",
    operatingHours: "8:00 AM - 12:00 AM",
  },
  {
    id: "USR-D006",
    name: "Vikram Patel",
    email: "vikram@olivegarden.com",
    phone: "+91 43210 98765",
    role: "donor",
    address: "Indiranagar, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-11-01",
    status: "active",
    verificationStatus: "pending",
    totalDonations: 8,
    lastActive: "30 minutes ago",
    trustScore: 72,
    completionRate: 75,
    foodSavedKg: 180,
    avgMonthlyDonations: 3,
    businessName: "Olive Garden Restaurant",
    businessCategory: "Restaurant",
    licenseNumber: "BLR-RS-2024-112",
    operatingHours: "11:00 AM - 11:00 PM",
  },
];

export const mockReceivers: User[] = [
  {
    id: "USR-R001",
    name: "Arun Patel",
    email: "arun.patel@gmail.com",
    phone: "+91 98123 45678",
    role: "receiver",
    address: "Koramangala, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-04-20",
    status: "active",
    verificationStatus: "verified",
    totalCollections: 28,
    lastActive: "1 hour ago",
    notificationsReceived: 156,
  },
  {
    id: "USR-R002",
    name: "Kavitha Nair",
    email: "kavitha.n@gmail.com",
    phone: "+91 87123 45678",
    role: "receiver",
    address: "HSR Layout, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-06-12",
    status: "active",
    verificationStatus: "verified",
    totalCollections: 19,
    lastActive: "3 hours ago",
    notificationsReceived: 98,
  },
  {
    id: "USR-R003",
    name: "Deepak Singh",
    email: "deepak.singh@gmail.com",
    phone: "+91 76123 45678",
    role: "receiver",
    address: "BTM Layout, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-08-05",
    status: "active",
    verificationStatus: "verified",
    totalCollections: 42,
    lastActive: "45 minutes ago",
    notificationsReceived: 234,
  },
  {
    id: "USR-R004",
    name: "Lakshmi Iyer",
    email: "lakshmi.iyer@gmail.com",
    phone: "+91 65123 45678",
    role: "receiver",
    address: "Jayanagar, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-02-28",
    status: "active",
    verificationStatus: "verified",
    totalCollections: 35,
    lastActive: "2 hours ago",
    notificationsReceived: 189,
  },
  {
    id: "USR-R005",
    name: "Rahul Menon",
    email: "rahul.menon@gmail.com",
    phone: "+91 54123 45678",
    role: "receiver",
    address: "Marathahalli, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-10-10",
    status: "suspended",
    verificationStatus: "unverified",
    totalCollections: 8,
    lastActive: "1 week ago",
    notificationsReceived: 42,
  },
  {
    id: "USR-R006",
    name: "Sneha Reddy",
    email: "sneha.reddy@gmail.com",
    phone: "+91 98456 12345",
    role: "receiver",
    address: "Electronic City, Bangalore",
    city: "Bangalore",
    avatar: "",
    joinedDate: "2025-12-01",
    status: "active",
    verificationStatus: "pending",
    totalCollections: 5,
    lastActive: "6 hours ago",
    notificationsReceived: 28,
  },
];

// ---- Notifications ----

export const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    title: "New Food Available Nearby",
    message: "Biryani - Chicken (50 servings) is available at Grand Palace Hall, just 1.2 km away!",
    type: "new_food",
    read: false,
    createdAt: "2026-06-27T17:35:00",
    icon: "🍽️",
    donationId: "DON-001",
    foodImage: foodImages[0],
    distance: "1.2 km",
    timeRemaining: "3h 25m",
  },
  {
    id: "NOT-002",
    title: "Food Expiring Soon",
    message: "Fresh Fruit Platter at Taj Gateway will expire in 1 hour. Collect now!",
    type: "expiring",
    read: false,
    createdAt: "2026-06-27T17:00:00",
    icon: "⏰",
    donationId: "DON-003",
    foodImage: foodImages[2],
    distance: "3.1 km",
    timeRemaining: "1h 00m",
  },
  {
    id: "NOT-003",
    title: "Donation Entered Your Radius",
    message: "Good News! Paneer Butter Masala has entered your notification radius (5 km).",
    type: "radius_expanded",
    read: false,
    createdAt: "2026-06-27T16:30:00",
    icon: "📡",
    donationId: "DON-009",
    foodImage: foodImages[5],
    distance: "0.8 km",
    timeRemaining: "5h 30m",
  },
  {
    id: "NOT-004",
    title: "Receiver Interested",
    message: "Deepak Singh is interested in your Biryani - Chicken donation.",
    type: "receiver_interested",
    read: false,
    createdAt: "2026-06-27T17:40:00",
    icon: "👤",
    donationId: "DON-001",
    receiverName: "Deepak Singh",
  },
  {
    id: "NOT-005",
    title: "Food Collected Successfully",
    message: "Your donation of Dal & Rice Combo has been successfully collected by Deepak Singh!",
    type: "collected",
    read: true,
    createdAt: "2026-06-27T13:15:00",
    icon: "✅",
    donationId: "DON-004",
    receiverName: "Deepak Singh",
  },
  {
    id: "NOT-006",
    title: "Radius Expanded to 12 km",
    message: "Your Assorted Sandwiches donation notification radius has expanded to 12 km. 89 receivers notified.",
    type: "radius_expanded",
    read: true,
    createdAt: "2026-06-27T14:30:00",
    icon: "📡",
    donationId: "DON-002",
  },
  {
    id: "NOT-007",
    title: "Receiver Arriving",
    message: "Arun Patel is on the way to collect Idli & Sambar. Estimated arrival: 15 minutes.",
    type: "receiver_arriving",
    read: true,
    createdAt: "2026-06-27T08:30:00",
    icon: "🚗",
    donationId: "DON-007",
    receiverName: "Arun Patel",
  },
  {
    id: "NOT-008",
    title: "Welcome to Smart Food Rescue!",
    message: "Thank you for joining our mission to reduce food waste. Start discovering food near you!",
    type: "system",
    read: true,
    createdAt: "2026-06-20T08:00:00",
    icon: "🎉",
  },
];

// ---- Pickup Locations ----

export const mockPickupLocations: PickupLocation[] = [
  {
    id: "PL-001",
    name: "ISKCON Temple - Rajajinagar",
    type: "temple",
    address: "Hare Krishna Hill, Chord Road, Rajajinagar",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9858,
    longitude: 77.5513,
    status: "active",
    dailyCapacity: 500,
    contactPerson: "Govinda Das",
    contactPhone: "+91 98765 00001",
    createdAt: "2025-01-15",
    totalPickups: 342,
  },
  {
    id: "PL-002",
    name: "St. Mary's Church - Shivajinagar",
    type: "church",
    address: "Shivajinagar Main Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9832,
    longitude: 77.6050,
    status: "active",
    dailyCapacity: 200,
    contactPerson: "Father Thomas",
    contactPhone: "+91 98765 00002",
    createdAt: "2025-02-20",
    totalPickups: 189,
  },
  {
    id: "PL-003",
    name: "Jama Masjid - Commercial Street",
    type: "mosque",
    address: "Commercial Street, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9815,
    longitude: 77.6090,
    status: "active",
    dailyCapacity: 300,
    contactPerson: "Imam Abdullah",
    contactPhone: "+91 98765 00003",
    createdAt: "2025-03-10",
    totalPickups: 256,
  },
  {
    id: "PL-004",
    name: "Koramangala Community Hall",
    type: "community_hall",
    address: "80 Feet Road, Koramangala 4th Block",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9352,
    longitude: 77.6245,
    status: "active",
    dailyCapacity: 150,
    contactPerson: "Ramesh Gowda",
    contactPhone: "+91 98765 00004",
    createdAt: "2025-04-05",
    totalPickups: 178,
  },
  {
    id: "PL-005",
    name: "BTM Layout Community Center",
    type: "community_center",
    address: "BTM 2nd Stage, 16th Main Road",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9166,
    longitude: 77.6101,
    status: "active",
    dailyCapacity: 250,
    contactPerson: "Srinivas K",
    contactPhone: "+91 98765 00005",
    createdAt: "2025-05-15",
    totalPickups: 215,
  },
  {
    id: "PL-006",
    name: "HSR Layout Community Center",
    type: "community_center",
    address: "HSR Layout, Sector 7, 27th Main",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9116,
    longitude: 77.6389,
    status: "disabled",
    dailyCapacity: 100,
    contactPerson: "Meena Rao",
    contactPhone: "+91 98765 00006",
    createdAt: "2025-06-20",
    totalPickups: 45,
  },
];

// ---- Verification Queue ----

export const mockVerificationQueue: VerificationEntry[] = [
  {
    id: "VER-001",
    businessName: "Spice Garden Restaurant",
    ownerName: "Vikram Patel",
    licenseNumber: "BLR-RS-2026-015",
    phone: "+91 43210 98765",
    email: "vikram@spicegarden.com",
    address: "5th Cross, Koramangala, Bangalore",
    city: "Bangalore",
    businessCategory: "Restaurant",
    documents: ["Business License", "FSSAI Certificate", "GST Registration"],
    submittedDate: "2026-06-25",
    status: "pending",
  },
  {
    id: "VER-002",
    businessName: "Green Leaf Caterers",
    ownerName: "Meera Krishnan",
    licenseNumber: "BLR-CT-2026-022",
    phone: "+91 98712 34567",
    email: "meera@greenleaf.com",
    address: "Jayanagar, 4th Block, Bangalore",
    city: "Bangalore",
    businessCategory: "Catering Service",
    documents: ["Business License", "FSSAI Certificate"],
    submittedDate: "2026-06-26",
    status: "pending",
  },
  {
    id: "VER-003",
    businessName: "Royal Feast Banquet",
    ownerName: "Arjun Mehta",
    licenseNumber: "BLR-BQ-2026-008",
    phone: "+91 87612 34567",
    email: "arjun@royalfeast.com",
    address: "Ring Road, Hebbal, Bangalore",
    city: "Bangalore",
    businessCategory: "Banquet Hall",
    documents: ["Business License", "FSSAI Certificate", "GST Registration", "Fire Safety Certificate"],
    submittedDate: "2026-06-27",
    status: "pending",
  },
  {
    id: "VER-004",
    businessName: "Campus Bites",
    ownerName: "Sanjay Gupta",
    licenseNumber: "BLR-RS-2026-031",
    phone: "+91 76512 34567",
    email: "sanjay@campusbites.com",
    address: "Electronic City Phase 1, Bangalore",
    city: "Bangalore",
    businessCategory: "Quick Service Restaurant",
    documents: ["Business License"],
    submittedDate: "2026-06-24",
    status: "more_info_needed",
    notes: "FSSAI certificate required. Please upload.",
  },
];

// ---- Notification Logs ----

export const mockNotificationLogs: NotificationLog[] = [
  {
    id: "NL-001",
    donationId: "DON-001",
    donationName: "Biryani - Chicken",
    donorName: "Grand Palace Banquet",
    initialRadius: 5,
    currentRadius: 8,
    usersNotified: 34,
    expansionCount: 1,
    collectionResult: "pending",
    notificationTime: "2026-06-27T17:30:00",
    expansionTimeline: [
      { radius: 5, time: "2026-06-27T17:30:00", notified: 18 },
      { radius: 8, time: "2026-06-27T17:40:00", notified: 16 },
    ],
  },
  {
    id: "NL-002",
    donationId: "DON-002",
    donationName: "Assorted Sandwiches",
    donorName: "Byte Cafe",
    initialRadius: 5,
    currentRadius: 12,
    usersNotified: 89,
    expansionCount: 2,
    collectionResult: "pending",
    notificationTime: "2026-06-27T13:30:00",
    expansionTimeline: [
      { radius: 5, time: "2026-06-27T13:30:00", notified: 22 },
      { radius: 8, time: "2026-06-27T13:40:00", notified: 31 },
      { radius: 12, time: "2026-06-27T13:50:00", notified: 36 },
    ],
  },
  {
    id: "NL-003",
    donationId: "DON-004",
    donationName: "Dal & Rice Combo",
    donorName: "ISKCON Kitchen",
    initialRadius: 5,
    currentRadius: 5,
    usersNotified: 22,
    expansionCount: 0,
    collectionResult: "collected",
    notificationTime: "2026-06-27T11:00:00",
    expansionTimeline: [
      { radius: 5, time: "2026-06-27T11:00:00", notified: 22 },
    ],
  },
  {
    id: "NL-004",
    donationId: "DON-005",
    donationName: "Wedding Sweets Collection",
    donorName: "Sharma Marriage Hall",
    initialRadius: 5,
    currentRadius: 20,
    usersNotified: 210,
    expansionCount: 3,
    collectionResult: "expired",
    notificationTime: "2026-06-26T19:30:00",
    expansionTimeline: [
      { radius: 5, time: "2026-06-26T19:30:00", notified: 45 },
      { radius: 8, time: "2026-06-26T19:40:00", notified: 52 },
      { radius: 12, time: "2026-06-26T19:50:00", notified: 58 },
      { radius: 20, time: "2026-06-26T20:00:00", notified: 55 },
    ],
  },
  {
    id: "NL-005",
    donationId: "DON-003",
    donationName: "Fresh Fruit Platter",
    donorName: "Taj Gateway Hotel",
    initialRadius: 5,
    currentRadius: 20,
    usersNotified: 156,
    expansionCount: 3,
    collectionResult: "pending",
    notificationTime: "2026-06-27T10:30:00",
    expansionTimeline: [
      { radius: 5, time: "2026-06-27T10:30:00", notified: 28 },
      { radius: 8, time: "2026-06-27T10:40:00", notified: 38 },
      { radius: 12, time: "2026-06-27T10:50:00", notified: 42 },
      { radius: 20, time: "2026-06-27T11:00:00", notified: 48 },
    ],
  },
];

// ---- Reports ----

export const mockReports: Report[] = [
  {
    id: "RPT-001",
    type: "fake_donation",
    title: "Possible fake donation listing",
    description: "The food image appears to be stock photo. Quantity seems unrealistic for a small restaurant.",
    reportedBy: "USR-R003",
    reportedUser: "USR-D005",
    donationId: "DON-005",
    createdAt: "2026-06-26T10:00:00",
    status: "open",
    priority: "high",
  },
  {
    id: "RPT-002",
    type: "spam",
    title: "Duplicate listing spam",
    description: "Same donation posted 3 times within 1 hour with slight variations.",
    reportedBy: "system",
    reportedUser: "USR-D005",
    createdAt: "2026-06-25T14:30:00",
    status: "open",
    priority: "medium",
  },
  {
    id: "RPT-003",
    type: "complaint",
    title: "Food quality issue",
    description: "Received food was not fresh as described. It was stale and had a bad smell.",
    reportedBy: "USR-R002",
    reportedUser: "USR-D002",
    donationId: "DON-002",
    createdAt: "2026-06-24T16:00:00",
    status: "resolved",
    priority: "high",
  },
  {
    id: "RPT-004",
    type: "inactive_user",
    title: "Inactive donor for 30+ days",
    description: "Donor has not posted any donations in the last 30 days despite active status.",
    reportedBy: "system",
    reportedUser: "USR-D005",
    createdAt: "2026-06-23T09:00:00",
    status: "open",
    priority: "low",
  },
  {
    id: "RPT-005",
    type: "suspicious",
    title: "Unusual pickup location",
    description: "Donation pickup location is in a residential area with no registered business.",
    reportedBy: "USR-R004",
    reportedUser: "USR-D006",
    donationId: "DON-006",
    createdAt: "2026-06-27T08:00:00",
    status: "open",
    priority: "medium",
  },
];

// ---- Live Activity ----

export const mockLiveActivity: LiveActivity[] = [
  {
    id: "LA-001",
    action: "Donation Posted",
    detail: "Paneer Butter Masala — 35 servings by Spice Garden Restaurant",
    timestamp: "2 minutes ago",
    type: "donation_posted",
    donationId: "DON-009",
    icon: "📦",
  },
  {
    id: "LA-002",
    action: "Notifications Sent",
    detail: "15 receivers notified within 5 km for Paneer Butter Masala",
    timestamp: "2 minutes ago",
    type: "notification_sent",
    donationId: "DON-009",
    icon: "🔔",
  },
  {
    id: "LA-003",
    action: "Receiver Collected Food",
    detail: "Deepak Singh collected Dal & Rice Combo from ISKCON Temple",
    timestamp: "15 minutes ago",
    type: "receiver_collected",
    donationId: "DON-004",
    icon: "✅",
  },
  {
    id: "LA-004",
    action: "Radius Expanded",
    detail: "Assorted Sandwiches notification expanded from 8 km → 12 km",
    timestamp: "28 minutes ago",
    type: "radius_expanded",
    donationId: "DON-002",
    icon: "📡",
  },
  {
    id: "LA-005",
    action: "Donation Completed",
    detail: "Idli & Sambar — 80 servings successfully distributed",
    timestamp: "45 minutes ago",
    type: "donation_completed",
    donationId: "DON-007",
    icon: "🎉",
  },
  {
    id: "LA-006",
    action: "New User Registered",
    detail: "Sneha Reddy joined as a receiver from Electronic City",
    timestamp: "1 hour ago",
    type: "user_registered",
    icon: "👤",
  },
  {
    id: "LA-007",
    action: "Receiver Accepted",
    detail: "Arun Patel accepted Biryani - Chicken donation",
    timestamp: "1 hour 15 minutes ago",
    type: "receiver_accepted",
    donationId: "DON-001",
    icon: "🤝",
  },
  {
    id: "LA-008",
    action: "Donation Expired",
    detail: "Wedding Sweets Collection expired — no collection within timeframe",
    timestamp: "2 hours ago",
    type: "donation_expired",
    donationId: "DON-005",
    icon: "⏰",
  },
];

// ---- Collection History ----

export const mockCollectionHistory: CollectionHistoryItem[] = [
  {
    id: "CH-001",
    donationId: "DON-004",
    foodName: "Dal & Rice Combo",
    foodImage: foodImages[3],
    quantity: "100 servings",
    category: "Main Course",
    pickupLocation: "ISKCON Temple, Rajajinagar",
    distance: "4.0 km",
    collectedAt: "2026-06-27T13:15:00",
    donorName: "ISKCON Kitchen",
    status: "collected",
  },
  {
    id: "CH-002",
    donationId: "DON-007",
    foodName: "Idli & Sambar",
    foodImage: foodImages[0],
    quantity: "80 servings",
    category: "Breakfast",
    pickupLocation: "MTR Restaurant, Lalbagh Road",
    distance: "2.0 km",
    collectedAt: "2026-06-27T08:45:00",
    donorName: "MTR Catering",
    status: "collected",
  },
  {
    id: "CH-003",
    donationId: "DON-005",
    foodName: "Wedding Sweets Collection",
    foodImage: foodImages[4],
    quantity: "200 pieces",
    category: "Desserts",
    pickupLocation: "Kalyana Mantapa, JP Nagar",
    distance: "5.2 km",
    collectedAt: "2026-06-26T22:00:00",
    donorName: "Sharma Marriage Hall",
    status: "expired",
  },
  {
    id: "CH-004",
    donationId: "DON-010",
    foodName: "Chole Bhature",
    foodImage: foodImages[4],
    quantity: "60 servings",
    category: "North Indian",
    pickupLocation: "Punjab Grill, HSR Layout",
    distance: "3.5 km",
    collectedAt: "2026-06-27T14:00:00",
    donorName: "Punjab Grill",
    status: "cancelled",
  },
];

// ---- Saved Foods ----

export const mockSavedFoods: SavedFood[] = [
  {
    id: "SF-001",
    donationId: "DON-001",
    foodName: "Biryani - Chicken",
    foodImage: foodImages[0],
    quantity: "50 servings",
    category: "Rice Dishes",
    distance: "1.2 km",
    pickupLocation: "Grand Palace Hall, MG Road",
    availableUntil: "2026-06-28T01:00:00",
    donorName: "Grand Palace Banquet",
    savedAt: "2026-06-27T17:35:00",
  },
  {
    id: "SF-002",
    donationId: "DON-009",
    foodName: "Paneer Butter Masala",
    foodImage: foodImages[5],
    quantity: "35 servings",
    category: "Main Course",
    distance: "0.8 km",
    pickupLocation: "Spice Garden, Koramangala",
    availableUntil: "2026-06-28T00:00:00",
    donorName: "Spice Garden Restaurant",
    savedAt: "2026-06-27T18:35:00",
  },
];

// ---- Dashboard Stats ----

export const donorStats = {
  totalDonations: 45,
  activeDonations: 3,
  completedDonations: 38,
  estimatedMeals: 2250,
  foodSavedKg: 1250,
  co2Reduced: 692,
  avgCollectionTime: "18 min",
  successRate: 89,
};

export const receiverStats = {
  nearbyFood: 5,
  todaysDonations: 8,
  pickupLocations: 12,
  savedMeals: 156,
  foodSavedKg: 420,
  co2Saved: 232,
  avgDistance: "2.8 km",
  postedToday: 12,
};

export const adminStats = {
  totalDonors: 450,
  totalReceivers: 890,
  totalUsers: 1340,
  totalDonations: 3856,
  activeDonations: 142,
  todaysDonations: 32,
  foodSavedKg: 15420,
  co2Reduction: 8540,
  avgCollectionTime: "22 min",
  collectionSuccessRate: 87,
  expiredToday: 4,
  pendingVerifications: 3,
};

// ---- Chart Data ----

export const donationsOverTime = [
  { month: "Jan", donations: 120 },
  { month: "Feb", donations: 185 },
  { month: "Mar", donations: 240 },
  { month: "Apr", donations: 310 },
  { month: "May", donations: 420 },
  { month: "Jun", donations: 580 },
  { month: "Jul", donations: 490 },
  { month: "Aug", donations: 620 },
  { month: "Sep", donations: 710 },
  { month: "Oct", donations: 830 },
  { month: "Nov", donations: 950 },
  { month: "Dec", donations: 1100 },
];

export const userGrowth = [
  { month: "Jan", donors: 45, receivers: 80 },
  { month: "Feb", donors: 62, receivers: 115 },
  { month: "Mar", donors: 85, receivers: 160 },
  { month: "Apr", donors: 110, receivers: 220 },
  { month: "May", donors: 145, receivers: 290 },
  { month: "Jun", donors: 180, receivers: 370 },
  { month: "Jul", donors: 210, receivers: 430 },
  { month: "Aug", donors: 250, receivers: 510 },
  { month: "Sep", donors: 290, receivers: 590 },
  { month: "Oct", donors: 340, receivers: 680 },
  { month: "Nov", donors: 390, receivers: 780 },
  { month: "Dec", donors: 450, receivers: 890 },
];

export const foodDistribution = [
  { name: "Rice Dishes", value: 35 },
  { name: "Snacks", value: 20 },
  { name: "Main Course", value: 25 },
  { name: "Desserts", value: 10 },
  { name: "Fruits", value: 10 },
];

export const donationStatusDistribution = [
  { name: "Active", value: 142, color: "#10b981" },
  { name: "Collected", value: 3200, color: "#0ea5e9" },
  { name: "Expired", value: 380, color: "#f43f5e" },
  { name: "Cancelled", value: 90, color: "#f59e0b" },
  { name: "Pending", value: 44, color: "#8b5cf6" },
];

export const collectionSuccessRate = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 80 },
  { month: "Mar", rate: 82 },
  { month: "Apr", rate: 84 },
  { month: "May", rate: 85 },
  { month: "Jun", rate: 87 },
  { month: "Jul", rate: 86 },
  { month: "Aug", rate: 88 },
  { month: "Sep", rate: 89 },
  { month: "Oct", rate: 90 },
  { month: "Nov", rate: 88 },
  { month: "Dec", rate: 91 },
];

export const peakDonationHours = [
  { hour: "6 AM", donations: 12 },
  { hour: "8 AM", donations: 28 },
  { hour: "10 AM", donations: 15 },
  { hour: "12 PM", donations: 45 },
  { hour: "2 PM", donations: 38 },
  { hour: "4 PM", donations: 22 },
  { hour: "6 PM", donations: 35 },
  { hour: "8 PM", donations: 52 },
  { hour: "10 PM", donations: 30 },
];

export const topDonorLeaderboard = [
  { name: "ISKCON Kitchen", donations: 120, meals: 6000, badge: "🏆" },
  { name: "Taj Gateway Hotel", donations: 67, meals: 3350, badge: "🥈" },
  { name: "Grand Palace Banquet", donations: 45, meals: 2250, badge: "🥉" },
  { name: "Byte Cafe", donations: 32, meals: 1600, badge: "" },
  { name: "Sharma Marriage Hall", donations: 15, meals: 750, badge: "" },
];

export const mostActiveCities = [
  { city: "Bangalore", donations: 2400, donors: 280, receivers: 520 },
  { city: "Chennai", donations: 650, donors: 85, receivers: 180 },
  { city: "Hyderabad", donations: 420, donors: 50, receivers: 110 },
  { city: "Mumbai", donations: 280, donors: 30, receivers: 60 },
  { city: "Delhi", donations: 106, donors: 15, receivers: 20 },
];

export const monthlyDonorDonations = [
  { month: "Jan", donations: 3 },
  { month: "Feb", donations: 5 },
  { month: "Mar", donations: 4 },
  { month: "Apr", donations: 7 },
  { month: "May", donations: 6 },
  { month: "Jun", donations: 8 },
];

export const donorFoodCategories = [
  { name: "Rice Dishes", value: 40 },
  { name: "Main Course", value: 25 },
  { name: "Snacks", value: 15 },
  { name: "Desserts", value: 10 },
  { name: "Breakfast", value: 10 },
];

export const receiverMonthlyActivity = [
  { month: "Jan", collections: 2 },
  { month: "Feb", collections: 4 },
  { month: "Mar", collections: 3 },
  { month: "Apr", collections: 5 },
  { month: "May", collections: 6 },
  { month: "Jun", collections: 8 },
];

export const foodCategories = [
  "Rice Dishes",
  "Main Course",
  "Snacks",
  "Desserts",
  "Fruits",
  "Breakfast",
  "Italian",
  "Chinese",
  "South Indian",
  "North Indian",
  "Beverages",
  "Bakery",
  "Other",
];

export const recentActivity = [
  { id: 1, action: "Donation Created", item: "Biryani - Chicken", time: "2 hours ago", type: "create" as const },
  { id: 2, action: "Food Collected", item: "Dal & Rice Combo", time: "4 hours ago", type: "complete" as const },
  { id: 3, action: "Donation Created", item: "Idli & Sambar", time: "6 hours ago", type: "create" as const },
  { id: 4, action: "Food Expired", item: "Wedding Sweets", time: "8 hours ago", type: "expire" as const },
  { id: 5, action: "Donation Created", item: "Mixed Veg Curry", time: "10 hours ago", type: "create" as const },
];
