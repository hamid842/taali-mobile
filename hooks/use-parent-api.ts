import { parentApi } from "@lib/api/parent-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Query keys for better cache management
export const parentKeys = {
  all: ["parent"] as const,
  dashboard: () => [...parentKeys.all, "dashboard"] as const,
  children: () => [...parentKeys.all, "children"] as const,
  childDetail: (childId: number) =>
    [...parentKeys.children(), childId] as const,
  attendance: () => [...parentKeys.all, "attendance"] as const,
  grades: () => [...parentKeys.all, "grades"] as const,
  childAttendance: (childId: number) =>
    [...parentKeys.attendance(), childId] as const,
  childGrades: (childId: number) => [...parentKeys.grades(), childId] as const,
};

export const useParentApi = () => {
  const queryClient = useQueryClient();

  // Dashboard Stats
  const dashboardStatsQuery = useQuery({
    queryKey: parentKeys.dashboard(),
    queryFn: parentApi.getDashboardStats,
  });

  // My Children
  const myChildrenQuery = useQuery({
    queryKey: parentKeys.children(),
    queryFn: parentApi.getMyChildren,
  });

  // Child Detail
  const useChildDetail = (childId: number) => {
    return useQuery({
      queryKey: parentKeys.childDetail(childId),
      queryFn: () => parentApi.getChildDetail(childId),
      enabled: !!childId,
    });
  };

  // Children Attendance (all children)
  const childrenAttendanceQuery = useQuery({
    queryKey: parentKeys.attendance(),
    queryFn: parentApi.getChildrenAttendance,
  });

  // Children Grades (all children)
  const childrenGradesQuery = useQuery({
    queryKey: parentKeys.grades(),
    queryFn: parentApi.getChildrenGrades,
  });

  // Child-specific Attendance
  const useChildAttendance = (childId: number) => {
    return useQuery({
      queryKey: parentKeys.childAttendance(childId),
      queryFn: () => parentApi.getChildAttendance(childId),
      enabled: !!childId,
    });
  };

  // Child-specific Grades
  const useChildGrades = (childId: number) => {
    return useQuery({
      queryKey: parentKeys.childGrades(childId),
      queryFn: () => parentApi.getChildGrades(childId),
      enabled: !!childId,
    });
  };

  // Refresh all parent data
  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: parentKeys.all });
  };

  // Refresh children data only
  const refreshChildren = () => {
    queryClient.invalidateQueries({ queryKey: parentKeys.children() });
  };

  // Refresh dashboard data only
  const refreshDashboard = () => {
    queryClient.invalidateQueries({ queryKey: parentKeys.dashboard() });
  };

  // Refresh attendance data only
  const refreshAttendance = () => {
    queryClient.invalidateQueries({ queryKey: parentKeys.attendance() });
  };

  // Refresh grades data only
  const refreshGrades = () => {
    queryClient.invalidateQueries({ queryKey: parentKeys.grades() });
  };

  // Prefetch child detail
  const prefetchChildDetail = (childId: number) => {
    return queryClient.prefetchQuery({
      queryKey: parentKeys.childDetail(childId),
      queryFn: () => parentApi.getChildDetail(childId),
    });
  };

  // Prefetch children data
  const prefetchChildren = () => {
    return queryClient.prefetchQuery({
      queryKey: parentKeys.children(),
      queryFn: parentApi.getMyChildren,
    });
  };

  return {
    // Queries
    dashboardStats: dashboardStatsQuery,
    myChildren: myChildrenQuery,
    childrenAttendance: childrenAttendanceQuery,
    childrenGrades: childrenGradesQuery,

    // Query hooks
    useChildDetail,
    useChildAttendance,
    useChildGrades,

    // Refresh functions
    refreshAll,
    refreshChildren,
    refreshDashboard,
    refreshAttendance,
    refreshGrades,

    // Prefetch functions
    prefetchChildDetail,
    prefetchChildren,

    // Loading states (computed)
    isLoading: dashboardStatsQuery.isLoading || myChildrenQuery.isLoading,
    isError: dashboardStatsQuery.isError || myChildrenQuery.isError,
    error: dashboardStatsQuery.error || myChildrenQuery.error,

    // Individual loading states
    isDashboardLoading: dashboardStatsQuery.isLoading,
    isChildrenLoading: myChildrenQuery.isLoading,
    isAttendanceLoading: childrenAttendanceQuery.isLoading,
    isGradesLoading: childrenGradesQuery.isLoading,
  };
};

// Alternative: Simplified version if you prefer individual hooks
export const useParentDashboard = () => {
  return useQuery({
    queryKey: parentKeys.dashboard(),
    queryFn: parentApi.getDashboardStats,
  });
};

export const useParentChildren = () => {
  return useQuery({
    queryKey: parentKeys.children(),
    queryFn: parentApi.getMyChildren,
  });
};

export const useParentChildDetail = (childId: number) => {
  return useQuery({
    queryKey: parentKeys.childDetail(childId),
    queryFn: () => parentApi.getChildDetail(childId),
    enabled: !!childId,
  });
};

export const useParentChildrenAttendance = () => {
  return useQuery({
    queryKey: parentKeys.attendance(),
    queryFn: parentApi.getChildrenAttendance,
  });
};

export const useParentChildrenGrades = () => {
  return useQuery({
    queryKey: parentKeys.grades(),
    queryFn: parentApi.getChildrenGrades,
  });
};

export const useParentChildAttendance = (childId: number) => {
  return useQuery({
    queryKey: parentKeys.childAttendance(childId),
    queryFn: () => parentApi.getChildAttendance(childId),
    enabled: !!childId,
  });
};

export const useParentChildGrades = (childId: number) => {
  return useQuery({
    queryKey: parentKeys.childGrades(childId),
    queryFn: () => parentApi.getChildGrades(childId),
    enabled: !!childId,
  });
};
