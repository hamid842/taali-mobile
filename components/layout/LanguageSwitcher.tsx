import { TouchableOpacity, Text, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@hooks/use-theme";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  const toggleLanguage = async () => {
    const isFa = i18n.language === "fa";
    const nextLang = isFa ? "en" : "fa";

    await i18n.changeLanguage(nextLang);

    const shouldBeRTL = nextLang === "fa";

    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
    }
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
