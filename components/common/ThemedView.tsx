import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "@hooks/use-theme";
import { useTranslation } from "react-i18next";

interface ThemedViewProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
  background?: "default" | "card" | "muted";
  withPadding?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  className = "",
  children,
  background = "default",
  withPadding = false,
  style,
  ...props
}) => {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const getBackgroundClass = () => {
    switch (background) {
      case "card":
        return isDark ? "bg-dark-card" : "bg-light-card";
      case "muted":
        return isDark ? "bg-gray-900" : "bg-gray-100";
      default:
        return isDark ? "bg-dark-background" : "bg-light-background";
    }
  };

  const paddingClass = withPadding ? "p-4" : "";
  const baseClasses = `${getBackgroundClass()} ${paddingClass}`;
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <View
      className={combinedClasses}
      style={[
        {
          direction: isRTL ? "rtl" : "ltr",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedView;
