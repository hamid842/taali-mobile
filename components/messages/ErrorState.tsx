import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTheme } from "@hooks/use-theme";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { theme } = useTheme();
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Ionicons
        name={getIcon("messages")}
        size={48}
        color={theme === "dark" ? "#94A3B8" : "#64748B"}
      />
      <Text className="text-lg font-semibold mt-4 text-slate-900 dark:text-slate-100 text-center">
        Unable to load messages
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
        Please check your connection and try again
      </Text>
      <TouchableOpacity
        className="bg-blue-500 px-5 py-3 rounded-lg mt-5"
        onPress={onRetry}
      >
        <Text className="text-white font-semibold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}
