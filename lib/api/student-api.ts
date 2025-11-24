import { ApiResponse } from "@appTypes/api-response";
import { Teacher } from "@appTypes/teacher";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const studentApi = {
  // Get teachers for a specific student
  getStudentTeachers: async (
    studentId: number
  ): Promise<ApiResponse<Teacher[]>> => {
    const response = await apiClient.get<ApiResponse<Teacher[]>>(
      apiConfig.endpoints.students.getTeachers(studentId)
    );
    console.log("Teachers:", response.data);
    return response;
  },

  // Other student-related API calls can be added here
  getStudentById: async (id: number) => {
    return apiClient.get(apiConfig.endpoints.students.getById(id));
  },

  getStudentByUser: async (userId: number) => {
    return apiClient.get(apiConfig.endpoints.students.getByUser(userId));
  },

  updateStudentDetails: async (userId: number, details: any) => {
    return apiClient.put(
      apiConfig.endpoints.students.updateDetailsByUser(userId),
      details
    );
  },
};
