import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "contexts/ThemeContext";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fa" : "en");
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className={`px-4 py-2 rounded-lg border ${
        isDark
          ? "bg-dark-card border-dark-border"
          : "bg-light-card border-light-border"
      }`}
    >
      <Text
        className={`font-medium ${
          isDark ? "text-dark-text" : "text-light-text"
        }`}
      >
        {i18n.language === "en" ? "فارسی" : "EN"}
      </Text>
    </TouchableOpacity>
  );
}
