import { Stack, Redirect } from "expo-router";
import LoadingScreen from "@components/common/LoadingScreen";
import { useAuth } from "@hooks/use-auth";

export default function PanelLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If no user, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="teacher" />
      <Stack.Screen name="student" />
      <Stack.Screen name="parent" />
      <Stack.Screen name="canteen" />
    </Stack>
  );
}
