import { useQuery } from "@tanstack/react-query";
import { additionalApiEndpoints, additionalKeys } from "./keys";
import { Additional } from "./types";
import { ApiResponse } from "@/lib/types/api";
import api from "@/lib/axios";

export const useAdditionalByFoodQuery = (foodId: string) => {
  return useQuery<Additional[]>({
    queryKey: additionalKeys.lists(foodId),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Additional[]>>(
        additionalApiEndpoints.byFood(foodId)
      );
      return response.data.data;
    },
    enabled: !!foodId,
  });
};
