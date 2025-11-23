// app/(panel)/messages/components/Header.tsx
import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
  unreadCount?: number;
}

export default function MessagesHeader({
  title,
  unreadCount,
}: HeaderProps) {
  return (
    <View className="bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </Text>

        {unreadCount && unreadCount > 0 && (
          <View className="bg-red-500 rounded-xl px-2 py-1">
            <Text className="text-white text-xs font-semibold">
              {unreadCount} unread
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
