import { authKeys, apiEndpoints, storageKeys } from "./keys";
import { LoginPayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import api from "@/lib/axios";
import { useMutation } from "@/lib/hooks/useCustomQuery";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Login mutation
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (
      credentials: LoginPayload
    ): Promise<{ token: string }> => {
      const response = await api.post<ApiResponse<{ token: string }>>(
        apiEndpoints.auth.login,
        credentials
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data.token);
      localStorage.setItem(storageKeys.accessToken, data.token);
    },
  });
};

/**
 * Logout function
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    // Clear tokens from storage
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.user);

    // Reset auth-related queries
    queryClient.resetQueries({ queryKey: authKeys.all });

    // You could add a redirect here if needed
  };
};
