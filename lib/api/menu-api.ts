import { MenuItem } from "@appTypes/menu";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const menuApi = {
  fetchUserMenu: async (
    role: string,
    schoolId?: number
  ): Promise<MenuItem[]> => {
    const params = new URLSearchParams({ role });
    if (schoolId) {
      params.append("schoolId", schoolId.toString());
    }
    return apiClient.get<MenuItem[]>(
      `${apiConfig.endpoints.menu.getUserMenu}?${params}`
    );
  },
};