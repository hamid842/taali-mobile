import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const isRTL = i18n.language === "fa";

  return (
    <View
      className={`flex-1 ${
        isDark ? "bg-dark-background" : "bg-light-background"
      }`}
    >
      <Header title="Home" />

      <View
        className={`flex-1 justify-center items-center px-6 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        <Text
          className={`text-2xl font-bold mb-4 ${
            isDark ? "text-dark-text" : "text-light-text"
          }`}
        >
          {t("welcome")}
        </Text>

        <Text
          className={`text-lg mb-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Email: {user?.email}
        </Text>

        <Text
          className={`text-lg mb-6 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Role: {user?.role}
        </Text>

        <TouchableOpacity
          onPress={logout}
          className={`rounded-xl py-3 px-6 ${
            isDark ? "bg-red-600" : "bg-red-500"
          }`}
        >
          <Text className="text-white font-semibold text-lg">
            {t("logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
