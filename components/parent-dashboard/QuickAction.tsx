import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function QuickActions() {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToScreen = (screen: string) => {
    router.push(`/(app)/parent/${screen}`);
  };

  const actions = [
    {
      label: t("parent.dashboard.attendance"),
      icon: "clipboard-check",
      color: "blue",
      screen: "children-attendance",
    },
    {
      label: t("parent.dashboard.grades"),
      icon: "award",
      color: "yellow",
      screen: "children-grades",
    },
    {
      label: t("parent.dashboard.payments"),
      icon: "credit-card",
      color: "green",
      screen: "payments",
    },
    {
      label: t("parent.dashboard.notifications"),
      icon: "bell",
      color: "purple",
      screen: "notifications",
    },
  ];

  return (
    <View className="px-6 pb-8">
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {t("parent.dashboard.quickActions")}
      </Text>

      <View className="flex-row flex-wrap -mx-2">
        {actions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            className="w-1/2 px-2 mb-4"
            onPress={() => navigateToScreen(action.screen)}
          >
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center border border-gray-200 dark:border-gray-700">
              <View
                className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900 rounded-xl items-center justify-center mb-2`}
              >
                <Ionicons
                  name={getIcon(action.icon)}
                  size={24}
                  color={undefined}
                  className={`text-${action.color}-600 dark:text-${action.color}-400`}
                />
              </View>

              <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
