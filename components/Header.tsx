import { View, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import LanguageSwitcher from "./layout/LanguageSwitcher";
import ThemeToggler from "./layout/ThemeToggler";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { isDark } = useTheme();

  return (
    <View
      className={`flex-row items-center justify-between px-6 py-4 border-b ${
        isDark
          ? "bg-dark-background border-dark-border"
          : "bg-transparent border-b-0"
      }`}
    >
      <Text
        className={`text-xl font-bold ${
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
  );
}
