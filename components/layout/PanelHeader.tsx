import { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggler from "./ThemeToggler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@hooks/use-theme";
import ThemedView from "@components/common/ThemedView";
import { useRouter } from "expo-router";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { useMessageApi } from "@hooks/use-message-api";

type PanelHeaderProps = NativeStackHeaderProps | DrawerHeaderProps;

export default function PanelHeader(props: PanelHeaderProps) {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const { useGetUnreadCount } = useMessageApi();

  const { data: unreadCountData } = useGetUnreadCount();

  const unreadCount = useMemo(() => {
    return unreadCountData?.data || 0;
  }, [unreadCountData]);

  const isRTL = i18n.language === "fa";
  const canGoBack = navigation.canGoBack();

  const handleMessagesPress = () => {
    router.push("/(panel)/messages");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className={`border-b ${
        isDark
          ? "bg-dark-card border-dark-border"
          : "bg-light-card border-light-border"
      }`}
    >
      <ThemedView
        background="card"
        className="flex-row items-center justify-between px-6 py-4"
      >
        <View className="flex-row items-center flex-1">
          {/* Show back button only when we can go back */}
          {canGoBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-3"
            >
              <Ionicons
                name={isRTL ? "arrow-forward" : "arrow-back"}
                size={24}
                color={isDark ? "#F1F5F9" : "#1E293B"}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
            className="mr-3"
          >
            <Ionicons
              name="menu"
              size={24}
              color={isDark ? "#F1F5F9" : "#1E293B"}
            />
          </TouchableOpacity>

          <Text
            className={`text-xl font-bold flex-1 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            {(props as DrawerHeaderProps).options.title ||
              (props as NativeStackHeaderProps).options.title}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggler />

          {/* Messages Icon with Badge */}
          <TouchableOpacity
            onPress={handleMessagesPress}
            className="relative mr-3"
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={isDark ? "#F1F5F9" : "#1E293B"}
            />

            {/* Badge */}
            {unreadCount > 0 && (
              <View
                className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] justify-center items-center border-2 border-white dark:border-slate-800"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              >
                <Text className="text-white text-[10px] font-bold px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
