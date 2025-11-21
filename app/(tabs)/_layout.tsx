import { Slot, Redirect } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { isAuthenticated, isInitialized } = useAuth();
  const insets = useSafeAreaInsets();

  // Show loading state while checking auth
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* You can add a loading spinner here */}
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Slot />
    </View>
  );
}
