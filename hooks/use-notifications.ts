import { useState, useEffect, useRef, useCallback } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useMessageApi } from "./use-message-api";
import { useAuth } from "./use-auth";

// Configure global notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  const { user, isAuthenticated } = useAuth();
  const { useRegisterDevice } = useMessageApi();
  const { mutate: registerDevice, isPending: isRegisteringMutation } =
    useRegisterDevice();

  /** Register for Expo push notifications on the device */
  const registerForPushNotifications =
    useCallback(async (): Promise<string> => {
      if (!Device.isDevice)
        throw new Error("Must use physical device for push notifications");

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted")
        throw new Error("Push notification permissions not granted");

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    }, []);

  /** Register token with backend */
  const registerTokenWithBackend = useCallback(
    async (token: string, retryCount = 0) => {
      if (!user?.id) throw new Error("User not authenticated");

      registerDevice(
        {
          expoPushToken: token,
          deviceType: Platform.OS,
          userId: user.id.toString(),
        },
        {
          onSuccess: () => {
            console.log("Device token registered successfully");
          },
          onError: (err) => {
            console.error("Failed to register device token:", err);

            // Retry logic
            if (retryCount < 2) {
              setTimeout(() => {
                registerTokenWithBackend(token, retryCount + 1);
              }, 2000 * (retryCount + 1));
            } else {
              setError(
                "Failed to register for notifications after multiple attempts"
              );
            }
          },
        }
      );
    },
    [user, registerDevice]
  );

  /** Setup notification handlers */
  const setupNotificationHandlers = useCallback((router: any) => {
    if (!notificationListener.current) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
          console.log("Notification received:", notification);
        });
    }

    if (!responseListener.current) {
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const data = response.notification.request.content.data;
          console.log("Notification tapped:", data);

          if (data.type === "MESSAGE" && data.conversationId) {
            router.push({
              pathname: "/(panel)/messages/conversation",
              params: { conversationId: data.conversationId },
            });
          } else if (data.type === "ANNOUNCEMENT") {
            router.push("/(panel)/announcements");
          }
        });
    }
  }, []);

  /** Initialize notifications (called from RootLayout) */
  const initializeNotifications = useCallback(
    async (router: any) => {
      if (!isAuthenticated || !user) return;

      try {
        setIsRegistering(true);
        setError(null);

        const token = await registerForPushNotifications();
        setExpoPushToken(token);

        await registerTokenWithBackend(token);
        setupNotificationHandlers(router);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Notification initialization error:", err);
      } finally {
        setIsRegistering(false);
      }
    },
    [
      isAuthenticated,
      user,
      registerForPushNotifications,
      registerTokenWithBackend,
      setupNotificationHandlers,
    ]
  );

  /** Cleanup listeners */
  const cleanup = useCallback(() => {
    notificationListener.current?.remove();
    responseListener.current?.remove();
    notificationListener.current = null;
    responseListener.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  return {
    expoPushToken,
    notification,
    isRegistering: isRegistering || isRegisteringMutation,
    error,
    initializeNotifications,
    cleanup,
  };
};
