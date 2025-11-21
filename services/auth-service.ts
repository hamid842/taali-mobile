import { apiClient, apiConfig } from "@lib/apiConfig";
import type { LoginRequest, LoginResponse } from "@appTypes/auth";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(apiConfig.endpoints.auth.login, data);
  },
};
