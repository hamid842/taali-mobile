import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiClient,
  apiConfig,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
} from "../lib/apiConfig";
import { LoginResponse, User } from "types/auth";

export interface MenuItemDto {
  id: string;
  title: string;
  path: string;
  icon: string;
  children?: MenuItemDto[];
  permission?: string;
}

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

// Menu API
const menuApi = {
  fetchUserMenu: async (
    role: string,
    schoolId?: number
  ): Promise<MenuItemDto[]> => {
    const params = new URLSearchParams({ role });
    if (schoolId) {
      params.append("schoolId", schoolId.toString());
    }

    console.log(`fetchUserMenu - school ID= ${schoolId} - params= ${params}`);

    return apiClient.get<MenuItemDto[]>(
      `${apiConfig.endpoints.menu.getUserMenu}?${params}`
    );
  },
};

// Auth Context Type
interface AuthContextType {
  user: LoginResponse | null;
  currentRoleContext: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  menuItems: MenuItemDto[];
  isMenuLoading: boolean;
  isMenuError: boolean;
  login: (
    token: string,
    userData: LoginResponse,
    refreshToken?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  checkPermission: (permission: string) => boolean;
  refetchMenu: () => Promise<void>;
  updateSchoolContext: (schoolId: number, roleContext?: string) => void;
  resetRoleContext: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const logout = useCallback(async () => {
    try {
      // Clear secure storage
      await removeAuthToken();

      // Clear React Query cache
      queryClient.clear();

      // Reset state
      setUser(null);
      setCurrentRoleContext(null);

      // Note: In React Native, we handle navigation differently
      // The navigation will be handled by the component that uses this context
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [queryClient]);

  const checkAuthStatus = useCallback(async () => {
    console.log(`start to fetch ${user?.role} menu`);
    try {
      // We'll check if user data exists in state (from previous session)
      // In a real app, you might want to verify the token with the backend
      const token = await getAuthToken();

      if (token && user) {
        // User is considered authenticated if we have a token and user data
        // Prefetch menu when user is authenticated
        if (user.role) {
          queryClient.prefetchQuery({
            queryKey: ["menu", user.role, user?.currentSchool?.id],
            queryFn: () =>
              menuApi.fetchUserMenu(user.role!, user?.currentSchool?.id),
          });
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      await logout();
    } finally {
      setIsInitialized(true);
    }
  }, [logout, queryClient, user]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

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

  const login = async (
    token: string,
    userData: LoginResponse,
    refreshToken?: string
  ): Promise<void> => {
    try {
      // Store auth data
      await setAuthToken(token);

      // Set user state
      setUser(userData);

      // Invalidate and refetch menu
      if (userData.role) {
        queryClient.invalidateQueries({
          queryKey: ["menu", userData.role],
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      // Note: In React Native, we don't store full user data in secure storage
      // We only store the token and keep user data in state
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
  const updateSchoolContext = (schoolId: number, roleContext?: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        schoolId,
        currentSchool: user.currentSchool
          ? { ...user.currentSchool, id: schoolId }
          : undefined,
      };
      setUser(updatedUser);

      // If roleContext is provided, switch the role context
      if (roleContext) {
        setCurrentRoleContext(roleContext);
      }

      // Refetch menu with new context
      queryClient.invalidateQueries({
        queryKey: ["menu", roleContext || user.role, schoolId],
      });
    }
  };

  // Add function to reset role context
  const resetRoleContext = () => {
    setCurrentRoleContext(null);
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

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
