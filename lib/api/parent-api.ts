import { ApiResponse } from "@appTypes/api-response";
import { Child, ChildDetail, DashboardStats, Parent } from "@appTypes/parent";
import { Student } from "@appTypes/student";
import { Teacher } from "@appTypes/teacher";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const parentApi = {
  associateParentsWithStudent: async (
    studentId: number,
    parentIds: number[]
  ): Promise<Student> => {
    return apiClient.post(
      apiConfig.endpoints.parents.associateWithStudent(studentId),
      parentIds
    );
  },

  getParentsByStudent: async (studentId: number): Promise<Parent[]> => {
    return apiClient.get(apiConfig.endpoints.parents.getByStudent(studentId));
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    return apiClient.get(apiConfig.endpoints.parents.dashboardStats);
  },

  getMyChildren: async (): Promise<Child[]> => {
    return apiClient.get(apiConfig.endpoints.parents.myChildren);
  },

  getChildDetail: async (childId: number): Promise<ChildDetail> => {
    return apiClient.get(apiConfig.endpoints.parents.childDetail(childId));
  },

  getChildrenAttendance: async () => {
    return apiClient.get(apiConfig.endpoints.parents.childrenAttendance);
  },

  getChildrenGrades: async () => {
    return apiClient.get(apiConfig.endpoints.parents.childrenGrades);
  },

  getChildAttendance: async (childId: number) => {
    return apiClient.get(apiConfig.endpoints.parents.childAttendance(childId));
  },

  getChildGrades: async (childId: number) => {
    return apiClient.get(apiConfig.endpoints.parents.childGrades(childId));
  },

  // NEW: Get teachers for a specific student
  getStudentTeachers: async (studentId: number): Promise<Teacher[]> => {
     const response = await apiClient.get<ApiResponse<Teacher[]>>(
       apiConfig.endpoints.students.getTeachers(studentId)
     );
     return response.data;
   },
};
