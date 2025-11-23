import { View, Text, ActivityIndicator } from "react-native";

export function LoadingState() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text className="mt-3 text-slate-500 dark:text-slate-400">
        Loading conversations...
      </Text>
    </View>
  );
}
