import { View, Text, TouchableOpacity } from "react-native";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggler from "./ThemeToggler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "@components/common/ThemedView";
import { useTheme } from "@hooks/use-theme";
import { useRouter } from "expo-router";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { DrawerHeaderProps } from "@react-navigation/drawer";

type PanelHeaderProps = NativeStackHeaderProps | DrawerHeaderProps;

export default function PanelHeader(props: PanelHeaderProps) {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const canGoBack = navigation.canGoBack();

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
                name="arrow-back"
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
          <TouchableOpacity
            onPress={() => router.push("(panel)/messages")}
            className="mr-3"
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={isDark ? "#F1F5F9" : "#1E293B"}
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
