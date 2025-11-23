// app/(panel)/messages/components/EmptyState.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTheme } from "@hooks/use-theme";

interface EmptyStateProps {
  onNewMessage: () => void;
}

export default function MessagesEmptyState({
  onNewMessage,
}: EmptyStateProps) {
  const { theme } = useTheme();
  return (
    <View className="flex-1 justify-center items-center p-10 mt-16">
      <Ionicons
        name={getIcon("messages")}
        size={64}
        color={theme === "dark" ? "#475569" : "#CBD5E1"}
      />
      <Text className="text-lg font-semibold mt-4 text-slate-900 dark:text-slate-100 text-center">
        No messages yet
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center leading-5">
        Start a conversation with a teacher or school staff
      </Text>
      <TouchableOpacity
        className="bg-blue-500 px-6 py-3 rounded-lg mt-5"
        onPress={onNewMessage}
      >
        <Text className="text-white font-semibold">New Message</Text>
      </TouchableOpacity>
    </View>
  );
}
