import React from "react";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "@hooks/use-theme";
import CustomDrawerContent from "@components/layout/CustomDrawerContent";
import { useTranslation } from "react-i18next";
import PanelHeader from "@components/layout/PanelHeader";

export default function DrawerLayout() {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
          width: 320,
        },
        drawerLabelStyle: {
          color: isDark ? "#F1F5F9" : "#1E293B",
          fontSize: 14,
          fontWeight: "500",
        },
        drawerActiveBackgroundColor: isDark ? "#334155" : "#F1F5F9",
        drawerActiveTintColor: isDark ? "#60A5FA" : "#3B82F6",
        drawerInactiveTintColor: isDark ? "#94A3B8" : "#64748B",
        header: (props) => <PanelHeader {...props} />,
        drawerPosition: isRTL ? "right" : "left",
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="my-classes" />
      <Drawer.Screen name="my-students" />
      <Drawer.Screen name="attendance" />
      <Drawer.Screen name="assignments" />
      <Drawer.Screen name="grades" />
      <Drawer.Screen name="lesson-plans" />
    </Drawer>
  );
}
