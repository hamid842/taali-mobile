import { ScrollView, RefreshControl } from "react-native";
import { useTranslation } from "react-i18next";
import { useParentApi } from "@hooks/use-parent-api";
import { useNotifications } from "@hooks/use-notifications";

import LoadingScreen from "@components/common/LoadingScreen";
import { ErrorMessage } from "@components/common/ErrorMessage";
import NotificationPermissionRequest from "@components/notification/notification-permission-request";
import HeaderSection from "@components/parent-dashboard/HeaderSection";
import StatsGrid from "@components/parent-dashboard/StatsGrid";
import ChildrenSection from "@components/parent-dashboard/ChildrenSection";
import QuickActions from "@components/parent-dashboard/QuickAction";
import ThemedView from "@components/common/ThemedView";

export default function ParentDashboard() {
  const { t } = useTranslation();
  const { dashboardStats, myChildren, refreshAll } = useParentApi();
  const { error: notificationError } = useNotifications();

  const refreshing = dashboardStats.isLoading || myChildren.isLoading;

  if (dashboardStats.isLoading || myChildren.isLoading)
    return <LoadingScreen />;

  if (dashboardStats.error || myChildren.error)
    return (
      <ErrorMessage
        message={t("common.error.loadingData")}
        onRetry={refreshAll}
      />
    );

  return (
    <ThemedView className="flex-1">
      {notificationError && <NotificationPermissionRequest />}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshAll} />
        }
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection />
        <StatsGrid stats={dashboardStats.data} />
        <ChildrenSection myChildren={myChildren.data} />
        <QuickActions />
      </ScrollView>
    </ThemedView>
  );
}
