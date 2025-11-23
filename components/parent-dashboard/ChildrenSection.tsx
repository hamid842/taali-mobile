import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Child } from "@appTypes/parent";

export default function ChildrenSection({
  myChildren,
}: {
  myChildren: Child[] | undefined;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToChild = (childId: number) => {
    router.push(`/(app)/parent/child/${childId}`);
  };

  const navigateToScreen = (screen: string) => {
    router.push(`/(app)/parent/${screen}`);
  };
  return (
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

      {myChildren?.length === 0 ? (
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 items-center border border-gray-200 dark:border-gray-700">
          <Ionicons
            name={getIcon("users")}
            size={48}
            color={undefined}
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
        myChildren?.slice(0, 3).map((child) => (
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
                      color={undefined}
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
  );
}
