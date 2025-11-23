import { Stack } from "expo-router";
import RootHeader from "@components/layout/RootHeader";
import { useTranslation } from "react-i18next";
import ThemedView from "@components/common/ThemedView";

export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <ThemedView className="flex-1">
      <Stack
        screenOptions={{
          headerShown: true,
          header: (props) => <RootHeader {...props} />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ title: t("login.title") }} />
        <Stack.Screen name="forget-password" />
      </Stack>
    </ThemedView>
  );
}
