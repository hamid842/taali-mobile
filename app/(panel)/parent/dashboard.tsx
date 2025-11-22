// app/(app)/parent/dashboard.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useParentDashboard } from "@hooks/use-parent-dashboard";
import { useAuth } from "@hooks/use-auth";
import { useTranslation } from "react-i18next";
import { getIcon } from "@appUtils/get-icon";
import LoadingScreen from "@components/common/LoadingScreen";
import { ErrorMessage } from "@components/common/ErrorMessage";

export default function ParentDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { dashboardStats, myChildren, refreshAll } = useParentDashboard();

  const refreshing = dashboardStats.isLoading || myChildren.isLoading;

  const onRefresh = () => {
    refreshAll();
  };

  const navigateToChild = (childId: number) => {
    router.push(`/(app)/parent/child/${childId}`);
  };

  const navigateToScreen = (screen: string) => {
    router.push(`/(app)/parent/${screen}`);
  };

  if (dashboardStats.isLoading || myChildren.isLoading) {
    return <LoadingScreen />;
  }

  if (dashboardStats.error || myChildren.error) {
    return (
      <ErrorMessage
        message={t("common.error.loadingData")}
        onRetry={refreshAll}
      />
    );
  }

  const stats = dashboardStats.data;
  const children = myChildren.data || [];

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

        {/* Stats Grid */}
        <View className="px-6 pb-6">
          <View className="flex-row flex-wrap -mx-2">
            {/* Total Children */}
            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("my-children")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                  <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl items-center justify-center">
                    <Ionicons
                      name={getIcon("users")}
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.totalChildren || 0}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t("parent.dashboard.children")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("notifications")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                  <View className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl items-center justify-center">
                    <Ionicons
                      name={getIcon("bell")}
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.unreadNotifications || 0}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t("parent.dashboard.alerts")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Attendance */}
            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("children-attendance")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                  <View className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl items-center justify-center">
                    <Ionicons
                      name={getIcon("trending-up")}
                      size={24}
                      className="text-green-600 dark:text-green-400"
                    />
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.overallAttendanceRate || 0}%
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t("parent.dashboard.attendance")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Payments */}
            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("payments")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                  <View className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl items-center justify-center">
                    <Ionicons
                      name={getIcon("credit-card")}
                      size={24}
                      className="text-red-600 dark:text-red-400"
                    />
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.pendingPayments || 0}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t("parent.dashboard.payments")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Children Section */}
        <View className="px-6 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {t("parent.dashboard.myChildren")}
            </Text>
            <TouchableOpacity onPress={() => navigateToScreen("my-children")}>
              <Text className="text-blue-600 dark:text-blue-400 font-medium">
                {t("common.seeAll")}
              </Text>
            </TouchableOpacity>
          </View>

          {children.length === 0 ? (
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 items-center border border-gray-200 dark:border-gray-700">
              <Ionicons
                name={getIcon("users")}
                size={48}
                className="text-gray-400 dark:text-gray-500 mb-4"
              />
              <Text className="text-lg font-medium text-gray-900 dark:text-white text-center">
                {t("parent.dashboard.noChildren")}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
                {t("parent.dashboard.noChildrenDescription")}
              </Text>
            </View>
          ) : (
            children.slice(0, 3).map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => navigateToChild(child.id)}
              >
                <View className="bg-white dark:bg-gray-800 rounded-2xl mb-3 p-4 border border-gray-200 dark:border-gray-700">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-3">
                        <Text className="text-white font-bold text-lg">
                          {child.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                          {child.name}
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {child.grade} • {child.className}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <View className="flex-row items-center bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                        <Ionicons
                          name={getIcon("clipboard-check")}
                          size={12}
                          className="text-green-600 dark:text-green-400 mr-1"
                        />
                        <Text className="text-xs font-medium text-green-600 dark:text-green-400">
                          {child.attendanceRate}%
                        </Text>
                      </View>
                      {child.averageGrade && (
                        <View className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full mt-1">
                          <Text className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                            {child.averageGrade}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t("parent.dashboard.quickActions")}
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("children-attendance")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center border border-gray-200 dark:border-gray-700">
                <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl items-center justify-center mb-2">
                  <Ionicons
                    name={getIcon("clipboard-check")}
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {t("parent.dashboard.attendance")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("children-grades")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center border border-gray-200 dark:border-gray-700">
                <View className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl items-center justify-center mb-2">
                  <Ionicons
                    name={getIcon("award")}
                    size={24}
                    className="text-yellow-600 dark:text-yellow-400"
                  />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {t("parent.dashboard.grades")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("payments")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center border border-gray-200 dark:border-gray-700">
                <View className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl items-center justify-center mb-2">
                  <Ionicons
                    name={getIcon("credit-card")}
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {t("parent.dashboard.payments")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/2 px-2 mb-4"
              onPress={() => navigateToScreen("notifications")}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center border border-gray-200 dark:border-gray-700">
                <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl items-center justify-center mb-2">
                  <Ionicons
                    name={getIcon("bell")}
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {t("parent.dashboard.notifications")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
