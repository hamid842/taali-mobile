import { teacherDashboardApi } from "@lib/api/teacher-dashboard-api";
import { useQuery } from "@tanstack/react-query";

export const useTeacherDashboard = (teacherId?: number) => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["teacherDashboardStats", teacherId],
    queryFn: () => teacherDashboardApi.getDashboardStats(teacherId!),
    enabled: !!teacherId,
  });

  const { data: todaySchedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["teacherTodaySchedule", teacherId],
    queryFn: async () => teacherDashboardApi.getTodaySchedule(teacherId!),
    enabled: !!teacherId,
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ["teacherRecentActivity", teacherId],
    queryFn: async () => teacherDashboardApi.getRecentActivity(teacherId!),
    enabled: !!teacherId,
  });

  const isLoading = statsLoading || scheduleLoading || activityLoading;

  return {
    stats,
    todaySchedule,
    recentActivity,
    isLoading,
    error: null, // You can add error handling
  };
};
