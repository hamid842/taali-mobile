import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import AuthProvider from "../contexts/AuthContext";
import "../global.css";
import "../lib/i18n";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryProvider from "components/providers/QueryProvider";
import { ToastContainer } from "components/common/CustomToast";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
      <ToastContainer />
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={theme === "dark" ? "#0F172A" : "#ffffff"}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
}
