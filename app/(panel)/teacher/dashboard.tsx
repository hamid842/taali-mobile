import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ThemedView from "@components/common/ThemedView";
import { getIcon } from "@appUtils/get-icon";
import { useAuth } from "@hooks/use-auth";
import { useTheme } from "@hooks/use-theme";
import { useTeacherDashboard } from "@hooks/use-teacher-dashboard";

export default function TeacherDashboardScreen() {
  const { isDark } = useTheme();
  const { user, menuItems, isMenuLoading } = useAuth();
  const { t } = useTranslation();

  // Use the teacher dashboard hook
  const { stats, todaySchedule, recentActivity, isLoading } =
    useTeacherDashboard(user?.id);

  const handleQuickAction = (item: any) => {
    if (item.path) {
      router.push(item.path as any);
    }
  };

  const handleClassPress = (classId: number) => {
    router.push(`/(panel)/teacher/classes/${classId}`);
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
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

        {/* Statistics Grid */}
        {!isLoading && stats && (
          <View className="mb-6">
            <Text
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              {t("dashboard.overview") || "Overview"}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {/* Total Classes */}
              <View
                className={`w-[48%] gap-2 p-4 rounded-xl mb-4 ${
                  isDark ? "bg-blue-900/20" : "bg-blue-100"
                } border ${isDark ? "border-blue-800" : "border-blue-200"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="school-outline"
                    size={24}
                    color={isDark ? "#60A5FA" : "#3B82F6"}
                  />
                  <View className="ml-3">
                    <Text
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stats.totalClasses}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDark ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      Total Classes
                    </Text>
                  </View>
                </View>
              </View>

              {/* Total Students */}
              <View
                className={`w-[48%] gap-2 p-4 rounded-xl mb-4 ${
                  isDark ? "bg-green-900/20" : "bg-green-100"
                } border ${isDark ? "border-green-800" : "border-green-200"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="people-outline"
                    size={24}
                    color={isDark ? "#34D399" : "#10B981"}
                  />
                  <View className="ml-3">
                    <Text
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stats.totalStudents}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDark ? "text-green-300" : "text-green-700"
                      }`}
                    >
                      Students
                    </Text>
                  </View>
                </View>
              </View>

              {/* Pending Assignments */}
              <View
                className={`w-[48%] gap-2 p-4 rounded-xl mb-4 ${
                  isDark ? "bg-yellow-900/20" : "bg-yellow-100"
                } border ${isDark ? "border-yellow-800" : "border-yellow-200"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={isDark ? "#FBBF24" : "#F59E0B"}
                  />
                  <View className="ml-3">
                    <Text
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stats.assignmentsPending}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDark ? "text-yellow-300" : "text-yellow-700"
                      }`}
                    >
                      Pending Assignments
                    </Text>
                  </View>
                </View>
              </View>

              {/* Attendance to Take */}
              <View
                className={`w-[48%] gap-2 p-4 rounded-xl mb-4 ${
                  isDark ? "bg-red-900/20" : "bg-red-100"
                } border ${isDark ? "border-red-800" : "border-red-200"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="clipboard-outline"
                    size={24}
                    color={isDark ? "#F87171" : "#EF4444"}
                  />
                  <View className="ml-3">
                    <Text
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stats.attendanceRate}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDark ? "text-red-300" : "text-red-700"
                      }`}
                    >
                      Attendance Due
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Today's Schedule */}
        {todaySchedule && todaySchedule.length > 0 && (
          <View
            className={`rounded-2xl p-6 mb-6 ${
              isDark ? "bg-dark-card" : "bg-light-card"
            }`}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className={`text-xl font-bold ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                {t("dashboard.todaysSchedule") || "Today's Schedule"}
              </Text>
              <TouchableOpacity>
                <Text
                  className={`font-medium ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {todaySchedule.map((schedule, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClassPress(schedule.id)}
                className={`flex-row items-center py-3 ${
                  index !== todaySchedule.length - 1 ? "border-b" : ""
                } ${isDark ? "border-dark-border" : "border-light-border"}`}
              >
                <View
                  className={`w-12 h-12 rounded-full ${
                    isDark ? "bg-purple-900" : "bg-purple-100"
                  } items-center justify-center mr-3`}
                >
                  <Text
                    className={`font-bold ${
                      isDark ? "text-purple-300" : "text-purple-700"
                    }`}
                  >
                    {schedule.startTime} - {schedule.endTime}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {schedule.subject}
                  </Text>
                  <Text
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {schedule.className} • {schedule.room}
                  </Text>
                </View>
                <Text
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {schedule.startTime} - {schedule.endTime}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Access Grid */}
        {!isMenuLoading && menuItems.length > 0 && (
          <View className="mb-6">
            <Text
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              {t("dashboard.quickAccess") || "Quick Access"}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {menuItems.slice(0, 6).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleQuickAction(item)}
                  className={`w-[48%] p-4 rounded-xl mb-4 ${
                    isDark ? "bg-dark-card" : "bg-light-card"
                  } border ${
                    isDark ? "border-dark-border" : "border-light-border"
                  } active:opacity-70`}
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
        {recentActivity && recentActivity.length > 0 && (
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

            {recentActivity.slice(0, 5).map((activity, index) => (
              <View
                key={activity.id}
                className={`flex-row items-start py-3 ${
                  index !== recentActivity.length - 1 ? "border-b" : ""
                } ${isDark ? "border-dark-border" : "border-light-border"}`}
              >
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-3 mt-1 ${
                    activity.type === "assignment"
                      ? isDark
                        ? "bg-blue-900"
                        : "bg-blue-100"
                      : activity.type === "attendance"
                      ? isDark
                        ? "bg-green-900"
                        : "bg-green-100"
                      : activity.type === "grading"
                      ? isDark
                        ? "bg-yellow-900"
                        : "bg-yellow-100"
                      : isDark
                      ? "bg-purple-900"
                      : "bg-purple-100"
                  }`}
                >
                  <Ionicons
                    name={
                      activity.type === "assignment"
                        ? "document-text-outline"
                        : activity.type === "attendance"
                        ? "clipboard-outline"
                        : activity.type === "grading"
                        ? "trophy-outline"
                        : "book-outline"
                    }
                    size={16}
                    color={
                      activity.type === "assignment"
                        ? isDark
                          ? "#60A5FA"
                          : "#3B82F6"
                        : activity.type === "attendance"
                        ? isDark
                          ? "#34D399"
                          : "#10B981"
                        : activity.type === "grading"
                        ? isDark
                          ? "#FBBF24"
                          : "#F59E0B"
                        : isDark
                        ? "#A78BFA"
                        : "#8B5CF6"
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {activity.title}
                  </Text>
                  <Text
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {activity.description}
                  </Text>
                  {activity.classId && (
                    <Text
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Class: {activity.description}
                    </Text>
                  )}
                  <Text
                    className={`text-xs mt-1 ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {new Date(activity.timestamp).toLocaleDateString()} •{" "}
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            ))}
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

        {/* Loading State */}
        {isLoading && (
          <View className="items-center justify-center py-8">
            <ActivityIndicator
              size="large"
              color={isDark ? "#60A5FA" : "#3B82F6"}
            />
            <Text
              className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Loading dashboard data...
            </Text>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}
