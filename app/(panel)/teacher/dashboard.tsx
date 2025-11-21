import { Text, ScrollView } from "react-native";
import { useAuth } from "@hooks/use-auth";
import ThemedView from "@components/common/ThemedView";

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold dark:text-white mb-4">
          خوش آمدید، {user?.firstName}!
        </Text>
        {/* Dashboard content */}
      </ScrollView>
    </ThemedView>
  );
}
