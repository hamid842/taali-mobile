import { View, Text, TouchableOpacity } from "react-native";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggler from "./ThemeToggler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import ThemedView from "@components/common/ThemedView";
import { useTheme } from "@hooks/use-theme";
import { useRouter } from "expo-router";

interface PanelHeaderProps extends DrawerHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function PanelHeader({
  title,
  showBackButton = false,
}: PanelHeaderProps) {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top"]}
      className={`border-b ${
        isDark
          ? "bg-dark-card border-dark-border"
          : "bg-light-card border-light-border"
      }`}
    >
      <ThemedView background="card" className="flex-row items-center justify-between px-6 py-4">
        <View className="flex-row items-center flex-1">
          {showBackButton && (
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
            {title}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggler />
          <TouchableOpacity
            onPress={() => router.push("(panel)/teacher/inbox")}
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
