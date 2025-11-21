import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ThemedView from "@components/common/ThemedView";
import { getIcon } from "@appUtils/get-icon";
import { useAuth } from "@hooks/use-auth";
import { useTheme } from "@hooks/use-theme";

export default function DashboardScreen() {
  const { isDark } = useTheme();
  const { user, menuItems } = useAuth();
  const { t } = useTranslation();

  const handleQuickAction = (item: any) => {
    if (item.path) {
      router.push(item.path as any);
    }
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 p-6">
        {/* Welcome Card */}
        <View
          className={`rounded-2xl p-6 mb-6 ${
            isDark ? "bg-dark-card" : "bg-light-card"
          }`}
        >
          <Text
            className={`text-2xl font-bold mb-2 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            {t("dashboard.welcome") || "Welcome back"}, {user?.firstName}!
          </Text>
          <Text
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {user?.currentSchool?.name || "School Management System"}
          </Text>
          <Text
            className={`text-sm mt-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("dashboard.role") || "Role"}: {user?.role}
          </Text>
        </View>

        {/* Quick Access Grid */}
        {menuItems.length > 0 && (
          <View className="mb-6">
            <Text
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              {t("dashboard.quickAccess") || "Quick Access"}
            </Text>

            <View className="flex-row flex-wrap justify-between">
              {menuItems.slice(0, 8).map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleQuickAction(item)}
                  className={`w-[48%] p-4 rounded-xl mb-4 ${
                    isDark ? "bg-dark-card" : "bg-light-card"
                  } border ${
                    isDark ? "border-dark-border" : "border-light-border"
                  }`}
                >
                  <View className="items-center">
                    <View
                      className={`w-12 h-12 rounded-full ${
                        isDark ? "bg-blue-900" : "bg-blue-100"
                      } items-center justify-center mb-2`}
                    >
                      <Ionicons
                        name={getIcon(item.icon)}
                        size={24}
                        color={isDark ? "#60A5FA" : "#3B82F6"}
                      />
                    </View>
                    <Text
                      className={`text-center font-medium text-sm ${
                        isDark ? "text-dark-text" : "text-light-text"
                      }`}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Recent Activity */}
        <View
          className={`rounded-2xl p-6 ${
            isDark ? "bg-dark-card" : "bg-light-card"
          }`}
        >
          <Text
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            {t("dashboard.recentActivity") || "Recent Activity"}
          </Text>
          <Text
            className={`text-center py-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("dashboard.noRecentActivity") || "No recent activity to display"}
          </Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
