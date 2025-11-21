import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "expo-router";
import ThemedView from "@components/common/ThemedView";
import {
  filterMenuItemsByRole,
  getMenuItemRoute,
} from "@appUtils/route-mapper";
import { getIcon } from "@appUtils/get-icon";
import { useTheme } from "@hooks/use-theme";
import { useAuth } from "@hooks/use-auth";

const CustomDrawerContent = (props: any) => {
  const { isDark } = useTheme();
  const { user, logout, menuItems, isMenuLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  // Filter menu items for current user role
  const filteredMenuItems = filterMenuItemsByRole(menuItems, user.role!);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  const handleMenuPress = (item: any) => {
    if (item.path) {
      router.push(item.path as any);
      props.navigation.closeDrawer();
    }
  };

  return (
    <ThemedView className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* School & User Header */}
        <View
          className={`p-5 border-b ${
            isDark ? "border-dark-border" : "border-light-border"
          }`}
        >
          {/* School Info */}
          {user?.currentSchool && (
            <View className="mb-4">
              <Text
                className={`text-xl font-bold ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                {user.currentSchool.name}
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("drawer.school") || "School Management System"}
              </Text>
            </View>
          )}

          {/* User Profile */}
          <View className="flex-row items-center gap-2">
            <View
              className={`w-12 h-12 rounded-full ${
                isDark ? "bg-blue-900" : "bg-blue-100"
              } items-center justify-center mr-3`}
            >
              <Text
                className={`font-bold ${
                  isDark ? "text-blue-300" : "text-blue-600"
                }`}
              >
                {getInitials(user?.firstName!)}
              </Text>
            </View>
            <View className="flex-1">
              <Text
                className={`font-semibold ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                {user?.firstName || "User"}
              </Text>
              <Text
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {user?.role || "No Role"}
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {user?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Default Navigation Items */}
        <View className="flex-1">
          {/* Dynamic Portal Menu from API */}
          {filteredMenuItems.length > 0 && (
            <View className="mt-2">
              <Text
                className={`text-lg font-semibold px-5 py-3 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("drawer.portalMenu") || "PORTAL MENU"}
              </Text>
              {filteredMenuItems.map((item) => {
                const route = getMenuItemRoute(item);
                const isActive = pathname === route;
                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`flex-row items-center gap-2 px-5 py-3 mx-2 rounded-lg ${
                      isDark
                        ? "hover:bg-gray-800 active:bg-gray-700"
                        : "hover:bg-gray-100 active:bg-gray-200"
                    }`}
                    onPress={() => handleMenuPress(item)}
                  >
                    <Ionicons
                      name={getIcon(item.icon)}
                      size={20}
                      color={isDark ? "#94A3B8" : "#64748B"}
                    />
                    <Text
                      className={`ml-3 flex-1 font-medium ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {item.title}
                    </Text>
                    {item.children && item.children.length > 0 && (
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={isDark ? "#94A3B8" : "#64748B"}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Loading State */}
          {isMenuLoading && (
            <View className="px-5 py-4 flex-row items-center">
              <ActivityIndicator
                size="small"
                color={isDark ? "#60A5FA" : "#3B82F6"}
              />
              <Text
                className={`ml-3 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("drawer.loadingMenu") || "Loading menu..."}
              </Text>
            </View>
          )}

          {/* Empty State */}
          {!isMenuLoading && menuItems.length === 0 && (
            <View className="px-5 py-8 items-center">
              <Ionicons
                name="list-outline"
                size={40}
                color={isDark ? "#374151" : "#9CA3AF"}
              />
              <Text
                className={`mt-2 text-sm text-center ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("drawer.noMenuItems") || "No menu items available"}
              </Text>
              <Text
                className={`text-xs text-center mt-1 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {t("drawer.contactAdmin") || "Contact administrator for access"}
              </Text>
            </View>
          )}
        </View>
      </DrawerContentScrollView>

      {/* Footer with Logout */}
      <View
        className={`p-5 border-t ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <TouchableOpacity
          className={`flex-row items-center gap-2 py-3 rounded-lg ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text className="ml-3 text-red-500 font-medium">
            {t("drawer.logout") || "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default CustomDrawerContent;
