import { jwtDecode } from "jwt-decode";
import { authKeys, storageKeys } from "./keys";
import { JwtPayload } from "./types";
import { useQuery } from "@/lib/hooks/useCustomQuery";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async (): Promise<string | null> => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);

      if (!accessToken) {
        return null;
      }
      return accessToken;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

/**
 * Check if the current access token is valid
 */
export const useIsTokenValid = () => {
  return useQuery({
    queryKey: [...authKeys.all, "tokenValid"],
    queryFn: async (): Promise<boolean> => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);

      if (!accessToken) {
        return false;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(accessToken);

        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    },
    // Refresh the token validity check every minute
    refetchInterval: 180 * 1000,
  });
};
