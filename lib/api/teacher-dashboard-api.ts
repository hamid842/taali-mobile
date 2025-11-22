import {
  TeacherActivity,
  TeacherClass,
  TeacherDashboardStats,
  UpcomingClass,
} from "@appTypes/teacher";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const teacherDashboardApi = {
  getDashboardStats: async (
    teacherId: number
  ): Promise<TeacherDashboardStats> => {
    return apiClient.get<TeacherDashboardStats>(
      `${apiConfig.endpoints.teachers.getById(teacherId)}/dashboard/stats`
    );
  },

  getTeacherClasses: async (teacherId: number): Promise<TeacherClass[]> => {
    return apiClient.get<TeacherClass[]>(
      `${apiConfig.endpoints.teachers.getById(teacherId)}/classes`
    );
  },

  getUpcomingClasses: async (teacherId: number): Promise<UpcomingClass[]> => {
    return apiClient.get<UpcomingClass[]>(
      `${apiConfig.endpoints.teachers.getById(teacherId)}/upcoming-classes`
    );
  },

  getRecentActivity: async (teacherId: number): Promise<TeacherActivity[]> => {
    return apiClient.get<TeacherActivity[]>(
      `${apiConfig.endpoints.teachers.getById(teacherId)}/recent-activity`
    );
  },

  getTodaySchedule: async (teacherId: number): Promise<UpcomingClass[]> => {
    return apiClient.get<UpcomingClass[]>(
      `${apiConfig.endpoints.teachers.getById(teacherId)}/today-schedule`
    );
  },
};
