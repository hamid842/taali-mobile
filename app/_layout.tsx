import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import "../global.css";
import "@lib/i18n";
import Providers from "@components/providers";
import { useTheme } from "@hooks/use-theme";
import { useAuth } from "@hooks/use-auth";
import { useNotifications } from "@hooks/use-notifications";
import NotificationSetupLoader from "@components/notification/notification-setup-loader";
import NotificationErrorBanner from "@components/notification/notification-error-banner";

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { initializeNotifications, cleanup, isRegistering, error } =
    useNotifications();

  // Initialize notifications only once when the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Pass router if needed for deep linking
      initializeNotifications(router);
    }
  }, [isAuthenticated, user, initializeNotifications, router]);

  // Cleanup on unmount (extra safety)
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={theme === "dark" ? "#1E293B" : "#F8FAFC"}
      />

      {/* Notification Status Components */}
      {isAuthenticated && (
        <>
          {isRegistering && <NotificationSetupLoader />}
          {error && <NotificationErrorBanner error={error} />}
        </>
      )}

      {/* Main Stack Navigator */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(panel)" />
      </Stack>
    </>
  );
}
