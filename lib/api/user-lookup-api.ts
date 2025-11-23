import { User } from "@appTypes/auth";
import { Student } from "@appTypes/student";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const userLookupApi = {
  // Get teachers for parent
  getTeachers: async (): Promise<User[]> => {
    return apiClient.get<User[]>(apiConfig.endpoints.users.getTeachers);
  },

  // Get parents for teacher
  getParents: async (): Promise<User[]> => {
    return apiClient.get<User[]>(apiConfig.endpoints.users.getParents);
  },

  // Get students for parent
  getStudents: async (): Promise<Student[]> => {
    return apiClient.get<Student[]>(apiConfig.endpoints.users.getStudents);
  },
};
