import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTheme } from "@hooks/use-theme";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
}

export function MessagesSearchBar({
  searchQuery,
  onSearchChange,
  onClear,
}: SearchBarProps) {
  const { theme } = useTheme();
  return (
    <View className="bg-white dark:bg-slate-800 px-4 py-4 border-b border-slate-200 dark:border-slate-700">
      <View className="flex-row items-center bg-slate-100 dark:bg-slate-700 rounded-lg px-3">
        <Ionicons
          name={getIcon("search")}
          size={20}
          color={theme === "dark" ? "#94A3B8" : "#64748B"}
        />
        <TextInput
          className="flex-1 py-3 px-3 text-slate-900 dark:text-slate-100 text-base"
          placeholder="Search messages..."
          placeholderTextColor={theme === "dark" ? "#94A3B8" : "#64748B"}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Text className="text-blue-500 font-medium">Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
