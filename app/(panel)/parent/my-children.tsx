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
import { useTranslation } from "react-i18next";
import LoadingScreen from "@components/common/LoadingScreen";
import { getIcon } from "@appUtils/get-icon";
import { ErrorMessage } from "@components/common/ErrorMessage";

export default function MyChildrenScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { myChildren, refreshAll } = useParentDashboard();

  const onRefresh = () => {
    refreshAll();
  };

  const navigateToChild = (childId: number) => {
    router.push(`/(panel)/parent/child/${childId}`);
  };

  const navigateToScreen = (screen: string, params?: any) => {
    router.push({ pathname: `/(panel)/parent/${screen}`, params });
  };

  if (myChildren.isLoading) {
    return <LoadingScreen />;
  }

  if (myChildren.error) {
    return (
      <ErrorMessage
        message={t("common.error.loadingData")}
        onRetry={refreshAll}
      />
    );
  }

  const children = myChildren.data || [];

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={myChildren.isLoading}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("parent.children.title")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 mt-1">
            {t("parent.children.subtitle", { count: children.length })}
          </Text>
        </View>

        {/* Children List */}
        <View className="px-6 pb-8">
          {children.length === 0 ? (
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 items-center mt-4 border border-gray-200 dark:border-gray-700">
              <Ionicons
                name={getIcon("users")}
                size={64}
                className="text-gray-400 dark:text-gray-500 mb-4"
              />
              <Text className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {t("parent.children.noChildren")}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center">
                {t("parent.children.noChildrenDescription")}
              </Text>
            </View>
          ) : (
            children.map((child) => (
              <View
                key={child.id}
                className="bg-white dark:bg-gray-800 rounded-2xl mb-4 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Child Header */}
                <TouchableOpacity
                  className="p-4 border-b border-gray-100 dark:border-gray-700"
                  onPress={() => navigateToChild(child.id)}
                >
                  <View className="flex-row items-center">
                    <View className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center mr-4">
                      <Text className="text-white font-bold text-xl">
                        {child.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-900 dark:text-white">
                        {child.name}
                      </Text>
                      <Text className="text-gray-600 dark:text-gray-300 mt-1">
                        {child.grade} • {child.className}
                      </Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {child.schoolName}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Stats */}
                <View className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <View className="flex-row justify-between">
                    <View className="items-center flex-1">
                      <View className="flex-row items-center mb-1">
                        <Ionicons
                          name={getIcon("clipboard-check")}
                          size={16}
                          className="text-green-500 mr-1"
                        />
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">
                          {child.attendanceRate}%
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {t("parent.children.attendance")}
                      </Text>
                    </View>

                    {child.averageGrade && (
                      <View className="items-center flex-1 border-l border-r border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center mb-1">
                          <Ionicons
                            name={getIcon("award")}
                            size={16}
                            className="text-yellow-500 mr-1"
                          />
                          <Text className="text-lg font-bold text-gray-900 dark:text-white">
                            {child.averageGrade}
                          </Text>
                        </View>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {t("parent.children.averageGrade")}
                        </Text>
                      </View>
                    )}

                    <View className="items-center flex-1">
                      <View className="flex-row items-center mb-1">
                        <Ionicons
                          name={getIcon("user")}
                          size={16}
                          className="text-blue-500 mr-1"
                        />
                        <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                          {child.teacherName.split(" ")[0]}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {t("parent.children.teacher")}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="p-4 flex-row space-x-3">
                  <TouchableOpacity
                    className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-xl py-3 flex-row items-center justify-center"
                    onPress={() =>
                      navigateToScreen("children-attendance", {
                        childId: child.id,
                      })
                    }
                  >
                    <Ionicons
                      name={getIcon("clipboard-check")}
                      size={16}
                      className="text-blue-600 dark:text-blue-400 mr-2"
                    />
                    <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      {t("parent.children.attendance")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl py-3 flex-row items-center justify-center"
                    onPress={() =>
                      navigateToScreen("children-grades", { childId: child.id })
                    }
                  >
                    <Ionicons
                      name={getIcon("award")}
                      size={16}
                      className="text-yellow-600 dark:text-yellow-400 mr-2"
                    />
                    <Text className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                      {t("parent.children.grades")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
