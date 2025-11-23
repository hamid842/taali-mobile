import { apiClient, apiConfig } from "@lib/apiConfig";

export const notificationApi = {
  // Register device for push notifications
  registerDevice: async (
    expoPushToken: string,
    deviceType: string,
    userId: string
  ): Promise<void> => {
    return apiClient.post(
      apiConfig.endpoints.notifications.registerDevice,
      {
        expoPushToken,
        deviceType: deviceType || "MOBILE",
      },
      {
        headers: {
          "X-User-Id": userId,
        },
      }
    );
  },

  // Unregister device
  unregisterDevice: async (token: string): Promise<void> => {
    return apiClient.post(
      apiConfig.endpoints.notifications.unregisterDevice,
      null,
      { params: { token } }
    );
  },
};
