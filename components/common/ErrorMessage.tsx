import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 items-center border border-red-200 dark:border-red-800">
        <Text className="text-lg font-medium text-red-800 dark:text-red-200 text-center mb-2">
          {message || t("common.error.loadingData")}
        </Text>
        {onRetry && (
          <TouchableOpacity
            className="bg-red-600 px-6 py-3 rounded-lg mt-4"
            onPress={onRetry}
          >
            <Text className="text-white font-medium text-sm">
              {t("common.tryAgain")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
