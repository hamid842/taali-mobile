import { Stack } from "expo-router";
import RootHeader from "@components/layout/RootHeader";
import ThemedView from "@components/common/ThemedView";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <ThemedView className="flex-1">
      <RootHeader title={t("login.title")} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forget-password" />
      </Stack>
    </ThemedView>
  );
}
