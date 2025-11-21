import * as SecureStore from "expo-secure-store";
import { I18nManager } from "react-native";
import i18n from "./i18n";
import { config } from "./config";

// Get API base URL from app.config.js or use default

const API_BASE_URL = config.API_BASE_URL;

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  SELECTED_LANGUAGE: "selected_language",
} as const;

// Get user's preferred language from SecureStore or i18n
const getPreferredLanguage = async (): Promise<string> => {
  try {
    const storedLanguage = await SecureStore.getItemAsync(
      STORAGE_KEYS.SELECTED_LANGUAGE
    );
    return storedLanguage || i18n.language || "fa";
  } catch (error) {
    console.error("Error getting language preference:", error);
    return i18n.language || "fa";
  }
};

// Get auth token from SecureStore
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/auth/login`,
    },
    menu: {
      getUserMenu: `${API_BASE_URL}/menu/user`,
    },
    teachers: {
      create: `${API_BASE_URL}/teachers`,
      getById: (id: number) => `${API_BASE_URL}/teachers/${id}`,
      update: (id: number) => `${API_BASE_URL}/teachers/${id}`,
      delete: (id: number) => `${API_BASE_URL}/teachers/${id}`,
      updateStatus: (id: number) => `${API_BASE_URL}/teachers/${id}/status`,
      getBySchool: (schoolId: number) =>
        `${API_BASE_URL}/teachers/school/${schoolId}`,
      search: `${API_BASE_URL}/teachers/search`,
      getBySubject: `${API_BASE_URL}/teachers/by-subject`,
      getActiveBySchool: (schoolId: number) =>
        `${API_BASE_URL}/teachers/school/${schoolId}/active`,
      getDashboardStats: (id: number) =>
        `${API_BASE_URL}/teachers/${id}/dashboard/stats`,
      getTeacherClasses: (id: number) =>
        `${API_BASE_URL}/teachers/${id}/classes`,
      getUpcomingClasses: (id: number) =>
        `${API_BASE_URL}/teachers/${id}/upcoming-classes`,
      getTodaySchedule: (id: number) =>
        `${API_BASE_URL}/teachers/${id}/today-schedule`,
      getRecentActivity: (id: number) =>
        `${API_BASE_URL}/teachers/${id}/recent-activity`,
      assignClass: (teacherId: number) =>
        `${API_BASE_URL}/teachers/${teacherId}/assign-classes`,
    },
  },
  headers: {
    "Content-Type": "application/json",
  },
};

// Generic API client
export const apiClient = {
  async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: unknown,
    options?: {
      language?: string;
      headers?: Record<string, string>;
      onProgress?: (progress: number) => void;
    }
  ): Promise<T> {
    try {
      const preferredLanguage =
        options?.language || (await getPreferredLanguage());
      const token = await getAuthToken();

      const headers: Record<string, string> = {
        ...apiConfig.headers,
        "Accept-Language": preferredLanguage,
        ...options?.headers,
      };

      // Add Authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Handle FormData differently
      let body: any = data;
      if (data && !(data instanceof FormData)) {
        body = JSON.stringify(data);
      } else if (data instanceof FormData) {
        // Remove Content-Type for FormData to let React Native set it with boundary
        delete headers["Content-Type"];
      }

      const config: RequestInit = {
        method,
        headers,
        body,
      };

      const response = await fetch(url, config);

      // Handle empty responses (like 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            `API error: ${response.status} ${response.statusText}`
        );
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network request failed");
    }
  },

  async get<T>(
    url: string,
    options?: {
      language?: string;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    return this.request<T>("GET", url, undefined, options);
  },

  async post<T>(
    url: string,
    data: unknown,
    options?: {
      language?: string;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    return this.request<T>("POST", url, data, options);
  },

  async put<T>(
    url: string,
    data: unknown,
    options?: {
      language?: string;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    return this.request<T>("PUT", url, data, options);
  },

  async patch<T>(
    url: string,
    data: unknown,
    options?: {
      language?: string;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    return this.request<T>("PATCH", url, data, options);
  },

  async delete<T>(
    url: string,
    options?: {
      language?: string;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    return this.request<T>("DELETE", url, undefined, options);
  },

  // Specialized upload method for file uploads
  async upload<T>(
    url: string,
    formData: FormData,
    options?: {
      language?: string;
      onProgress?: (progress: number) => void;
    }
  ): Promise<T> {
    // For React Native, we'll use the regular post method since progress tracking
    // requires more complex setup with libraries like react-native-fs
    return this.post<T>(url, formData, options);
  },
};

// Utility function to set language preference
export const setLanguagePreference = async (
  language: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEYS.SELECTED_LANGUAGE, language);

    // Update i18n
    await i18n.changeLanguage(language);

    // Force RTL if language is Persian
    if (language === "fa" && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (language !== "fa" && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  } catch (error) {
    console.error("Error setting language preference:", error);
  }
};

// Utility function to get current language
export const getCurrentLanguage = async (): Promise<string> => {
  return await getPreferredLanguage();
};

// Utility function to get full upload URL
export const getUploadUrl = (path: string): string => {
  if (path.startsWith("/")) {
    return `${apiConfig.baseURL}${path}`;
  }
  return `${apiConfig.baseURL}/${path}`;
};

// Utility function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  return !!(await getAuthToken());
};

// Utility function to set auth token
export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error("Error setting auth token:", error);
    throw error;
  }
};

// Utility function to set auth token
export const setRefreshToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, token);
  } catch (error) {
    console.error("Error setting refresh token:", error);
    throw error;
  }
};

// Utility function to remove auth token (logout)
export const removeAuthToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error("Error removing auth token:", error);
    throw error;
  }
};

// Utility to clear all stored data
export const clearAllStorage = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.SELECTED_LANGUAGE);
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};
