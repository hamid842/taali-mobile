import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { DashboardStats } from "@appTypes/parent";

export default function StatsGrid({
  stats,
}: {
  stats: DashboardStats | undefined;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToScreen = (screen: string) =>
    router.push(`/(app)/parent/${screen}`);

  const cards = [
    {
      label: t("parent.dashboard.children"),
      value: stats?.totalChildren || 0,
      icon: "users",
      color: "blue",
      screen: "my-children",
    },
    {
      label: t("parent.dashboard.alerts"),
      value: stats?.unreadNotifications || 0,
      icon: "bell",
      color: "orange",
      screen: "notifications",
    },
    {
      label: t("parent.dashboard.attendance"),
      value: `${stats?.overallAttendanceRate || 0}%`,
      icon: "trending-up",
      color: "green",
      screen: "children-attendance",
    },
    {
      label: t("parent.dashboard.payments"),
      value: stats?.pendingPayments || 0,
      icon: "credit-card",
      color: "red",
      screen: "payments",
    },
  ];

  return (
    <View className="px-6 pb-6">
      <View className="flex-row flex-wrap -mx-2">
        {cards.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            className="w-1/2 px-2 mb-4"
            onPress={() => navigateToScreen(item.screen)}
          >
            <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <View className="flex-row items-center justify-between">
                <View
                  className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-xl items-center justify-center`}
                >
                  <Ionicons
                    name={getIcon(item.icon)}
                    size={24}
                    color={undefined}
                    className={`text-${item.color}-600 dark:text-${item.color}-400`}
                  />
                </View>

                <View className="items-end">
                  <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.label}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
