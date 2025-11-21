import { useRouter } from "expo-router";
import { useCallback } from "react";
import { UserRole, UserRoleType } from "app-data-types/role";

export function useRoleRedirect() {
  const router = useRouter();

  const getDashboardRoute = useCallback((role: UserRoleType): any => {

    switch (role) {
      case UserRole.TEACHER:
        return {
          pathname: "/(panel)/teacher",
          params: {},
        };
      case UserRole.STUDENT:
        return {
          pathname: "/(panel)/student",
          params: {},
        };
      case UserRole.PARENT:
        return {
          pathname: "/(panel)/parent",
          params: {},
        };
      case UserRole.CANTEEN_OPERATOR:
        return {
          pathname: "/(panel)/canteen",
          params: {},
        };
      default:
        return {
          pathname: "/(panel)",
          params: {},
        };
    }
  }, []);

  const redirectToDashboard = useCallback(
    async (role: UserRoleType) => {
      const route = getDashboardRoute(role);

      try {
        // Use replace with href object
        router.replace(route);
      } catch (error) {
        console.error("Router replace error:", error);
        // Fallback: try push instead
        router.push(route);
      }
    },
    [getDashboardRoute, router]
  );

  const navigateToDashboard = useCallback(
    (role: UserRoleType) => {
      const route = getDashboardRoute(role);
      router.push(route);
    },
    [getDashboardRoute, router]
  );

  return {
    getDashboardRoute,
    redirectToDashboard,
    navigateToDashboard,
  };
}
