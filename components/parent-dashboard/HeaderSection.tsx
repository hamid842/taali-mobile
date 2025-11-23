import { useAuth } from "@hooks/use-auth";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function HeaderSection() {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <View className="px-6 pt-6 pb-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("parent.dashboard.welcome")}
      </Text>

      <Text className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
        {user?.firstName}!
      </Text>

      <Text className="text-gray-600 dark:text-gray-300 mt-2">
        {t("parent.dashboard.subtitle")}
      </Text>
    </View>
  );
}
