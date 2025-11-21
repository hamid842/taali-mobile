// utils/routeMapper.ts
import type { MenuItem } from "@appTypes/menu";

/**
 * Convert server route to Expo Router route
 * Example: "/teacher/dashboard" -> "/(panel)/teacher/dashboard"
 */
export const mapServerRouteToExpoRoute = (serverRoute: string): string => {
  // Remove leading slash and map to Expo Router format
  const cleanRoute = serverRoute.startsWith("/")
    ? serverRoute.slice(1)
    : serverRoute;
  return `/(panel)/${cleanRoute}`;
};

/**
 * Get the target route for a menu item
 */
export const getMenuItemRoute = (item: MenuItem): string => {
  return mapServerRouteToExpoRoute(item.route);
};

/**
 * Filter menu items for current user role
 */
export const filterMenuItemsByRole = (
  menuItems: MenuItem[],
  userRole: string
): MenuItem[] => {
  return menuItems
    .filter(
      (item) =>
        item.allowedRoles.includes(userRole) &&
        item.isRootItem &&
        !item.hasChildren // Only show root items without children for now
    )
    .sort((a, b) => a.orderIndex - b.orderIndex);
};
