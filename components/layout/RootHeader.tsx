import { View, Text } from "react-native";
import { useTheme } from "@hooks/use-theme";
import LanguageSwitcher from "@components/layout/LanguageSwitcher";
import ThemeToggler from "@components/layout/ThemeToggler";
import { SafeAreaView } from "react-native-safe-area-context";

interface RootHeaderProps {
  title?: string;
}

export default function RootHeader({ title }: RootHeaderProps) {
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      className={`border-none flex flex-row items-center ${
        isDark
          ? "bg-dark-card border-dark-border"
          : "bg-light-card border-light-border"
      }`}
    >
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text
          className={`flex-1 text-xl font-bold ${
            isDark ? "text-dark-text" : "text-light-text"
          }`}
        >
          {title}
        </Text>

        <View className="flex-row items-center space-x-3">
          <LanguageSwitcher />
          <ThemeToggler />
        </View>
      </View>
    </SafeAreaView>
  );
}
