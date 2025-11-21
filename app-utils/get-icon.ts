import { Ionicons } from "@expo/vector-icons";

export const getIcon = (
  iconName: string = "document"
): keyof typeof Ionicons.glyphMap => {
  const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    // Dashboard & Layout
    "layout-dashboard": "grid-outline",
    dashboard: "grid-outline",
    home: "home-outline",

    // Users & People
    "users-round": "people-outline",
    users: "people-outline",
    "user-plus": "person-add-outline",
    "user-round-plus": "person-add-outline",
    user: "person-outline",
    contact: "person-outline",
    "file-user": "person-outline",
    "graduation-cap": "school-outline",

    // Education
    "book-open": "book-outline",
    book: "book-outline",
    "book-plus": "book-outline",
    library: "library-outline",
    "grid-2x2": "grid-outline",
    "grid-2x2-plus": "add-outline",

    // School & Classes
    school: "school-outline",
    classes: "business-outline",

    // Attendance & Checklist
    "clipboard-check": "clipboard-outline",
    attendance: "calendar-outline",

    // Grades & Awards
    award: "trophy-outline",
    grades: "trophy-outline",

    // Documents & Files
    "file-text": "document-text-outline",
    document: "document-outline",
    reports: "document-text-outline",

    // Finance & Payments
    "dollar-sign": "cash-outline",
    finance: "cash-outline",
    "credit-card": "card-outline",
    payments: "card-outline",
    "trending-down": "trending-down-outline",

    // Charts & Analytics
    "chart-bar": "bar-chart-outline",
    "bar-chart": "bar-chart-outline",

    // Settings & Tools
    settings: "settings-outline",
    "alarm-clock": "alarm-outline",
    bell: "notifications-outline",
    notifications: "notifications-outline",

    // Canteen & Food
    utensils: "restaurant-outline",
    "shopping-cart": "cart-outline",
    "fast-food": "fast-food-outline",
    package: "cube-outline",
    inventory: "cube-outline",

    // Schedule & Time
    calendar: "calendar-outline",
    schedule: "time-outline",
    time: "time-outline",

    // Communication
    messages: "chatbubble-outline",
    chatbubble: "chatbubble-outline",

    // Lists
    list: "list-outline",

    // Default fallbacks
    courses: "book-outline",
    events: "calendar-outline",
    profile: "person-outline",
    menu: "restaurant-outline",
  };

  // Convert to lowercase and handle hyphens/underscores
  const normalizedIconName = iconName.toLowerCase().replace(/[-_]/g, "");

  // Find exact match first
  if (iconMap[iconName]) {
    return iconMap[iconName];
  }

  // Try normalized name
  if (iconMap[normalizedIconName]) {
    return iconMap[normalizedIconName];
  }

  // Fallback to document icon
  return "document-outline";
};
