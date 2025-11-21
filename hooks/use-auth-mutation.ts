import { useMutation } from "@tanstack/react-query";
import { useAuth } from "contexts/AuthContext";
import { authService } from "services/auth-service";
import { LoginResponse } from "types/auth";
import { UserRoleType } from "types/role";

export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.userId && data.token) {
        const userData: LoginResponse = {
          id: data.id,
          userId: data.userId!,
          firstName: data.firstName!,
          lastName: data.lastName!,
          role: data.role! as UserRoleType,
          email: data.email!,
          currentSchool: data.currentSchool,
          permissions: data.permissions,
        };
        // Use the context login to update state
        login(data.token, userData, data.refreshToken);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};


