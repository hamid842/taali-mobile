import type { AuthContextType, LoginResponse, User } from "@appTypes/auth";
import { useState, useEffect, ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthToken, removeAuthToken, setAuthToken } from "@lib/apiConfig";
import { menuApi } from "@lib/api/menu-api";
import AuthContext from "@contexts/AuthContext";

// Storage keys
const STORAGE_KEYS = {
  USER: "user_data",
  MENU_ITEMS: "menu_items",
  ROLE_CONTEXT: "role_context",
};

// Mock permissions for each role
const rolePermissions = {
  OWNER: ["all"],
  ADMIN: ["all"],
  SUPERVISOR: ["view_reports", "manage_teachers", "view_students"],
  TEACHER: ["manage_classes", "manage_attendance", "manage_grades"],
  STUDENT: ["view_schedule", "submit_assignments", "view_grades"],
  PARENT: ["view_child_progress", "view_attendance", "make_payments"],
  CANTEEN_OPERATOR: ["manage_menu", "manage_orders", "view_inventory"],
  FINANCE_TEAM: ["manage_fees", "view_payments", "financial_reports"],
};

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentRoleContext, setCurrentRoleContext] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  // Load persisted data on app start
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        console.log("🔄 Loading persisted auth data...");

        const [storedUser, storedRoleContext] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.ROLE_CONTEXT),
        ]);

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log("✅ Loaded user from storage:", userData.email);
        }

        if (storedRoleContext) {
          setCurrentRoleContext(storedRoleContext);
          console.log(
            "✅ Loaded role context from storage:",
            storedRoleContext
          );
        }

        // Check if we have a token but no user data (edge case)
        const token = await getAuthToken();
        if (token && !storedUser) {
          console.log("⚠️ Token exists but no user data, clearing token...");
          await removeAuthToken();
        }
      } catch (error) {
        console.error("❌ Error loading persisted data:", error);
      } finally {
        setIsInitialized(true);
        console.log("✅ Auth initialization complete");
      }
    };

    loadPersistedData();
  }, []);

  const logout = useCallback(async () => {
    try {
      console.log("🚪 Logging out...");

      // Clear secure storage
      await removeAuthToken();

      // Clear AsyncStorage
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.MENU_ITEMS),
        AsyncStorage.removeItem(STORAGE_KEYS.ROLE_CONTEXT),
      ]);

      // Clear React Query cache
      queryClient.clear();

      // Reset state
      setUser(null);
      setCurrentRoleContext(null);

      console.log("✅ Logout completed");
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  }, [queryClient]);

  const login = async (
    token: string,
    userData: LoginResponse,
    refreshToken?: string
  ): Promise<void> => {
    try {
      console.log("🔐 Logging in...", userData.email);

      // Store auth token
      await setAuthToken(token);

      // Store user data in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

      // Set user state
      setUser(userData);

      // Invalidate and refetch menu
      if (userData.role) {
        queryClient.invalidateQueries({
          queryKey: ["menu", userData.role],
        });
      }

      console.log("✅ Login completed");
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error; // Re-throw to handle in login screen
    }
  };

  // React Query for menu
  const menuQuery = useQuery({
    queryKey: [
      "menu",
      currentRoleContext || user?.role,
      user?.currentSchool?.id,
    ],
    queryFn: () => {
      const roleToUse = currentRoleContext || user?.role;
      return roleToUse
        ? menuApi.fetchUserMenu(roleToUse, user?.currentSchool?.id)
        : [];
    },
    enabled: !!(currentRoleContext || user?.role),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      // Also update in AsyncStorage
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(updatedUser)
        );
      } catch (error) {
        console.error("Error updating user in storage:", error);
      }
    }
  };

  const checkPermission = (permission: string): boolean => {
    if (!user) return false;

    const userRole = user.role as keyof typeof rolePermissions;
    const permissions = rolePermissions[userRole] || [];

    return permissions.includes("all") || permissions.includes(permission);
  };

  // Function to manually refetch menu
  const refetchMenu = async () => {
    if (user?.role) {
      await queryClient.invalidateQueries({
        queryKey: ["menu", user.role, user?.currentSchool?.id],
      });
    }
  };

  // Update the updateSchoolContext function to handle role switching
  const updateSchoolContext = async (
    schoolId: number,
    roleContext?: string
  ) => {
    if (user) {
      const updatedUser = {
        ...user,
        schoolId,
        currentSchool: user.currentSchool
          ? { ...user.currentSchool, id: schoolId }
          : undefined,
      };
      setUser(updatedUser);

      // Update in AsyncStorage
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(updatedUser)
      );

      // If roleContext is provided, switch the role context
      if (roleContext) {
        setCurrentRoleContext(roleContext);
        await AsyncStorage.setItem(STORAGE_KEYS.ROLE_CONTEXT, roleContext);
      }

      // Refetch menu with new context
      queryClient.invalidateQueries({
        queryKey: ["menu", roleContext || user.role, schoolId],
      });
    }
  };

  // Add function to reset role context
  const resetRoleContext = async () => {
    setCurrentRoleContext(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.ROLE_CONTEXT);
    queryClient.invalidateQueries({
      queryKey: ["menu", user?.role, user?.currentSchool?.id],
    });
  };

  const value: AuthContextType = {
    user,
    currentRoleContext: currentRoleContext || user?.role || null,
    isLoading: menuQuery.isLoading,
    isAuthenticated: !!user,
    isInitialized,
    menuItems: menuQuery.data || [],
    isMenuLoading: menuQuery.isLoading,
    isMenuError: menuQuery.isError,
    login,
    logout,
    updateUser,
    checkPermission,
    refetchMenu,
    updateSchoolContext,
    resetRoleContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
