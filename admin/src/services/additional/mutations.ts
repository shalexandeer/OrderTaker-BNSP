import { useMutation } from "@tanstack/react-query";
import { additionalApiEndpoints, additionalKeys } from "./keys";
import {
  Additional,
  AdditionalCreatePayload,
  AdditionalUpdatePayload,
} from "./types";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import api from "@/lib/axios";

export const useCreateAdditionalMutation = () => {
  return useMutation({
    mutationFn: async (payload: AdditionalCreatePayload) => {
      const response = await api.post<ApiResponse<Additional>>(
        additionalApiEndpoints.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: additionalKeys.lists(variables.foodId),
      });
    },
  });
};

export const useUpdateAdditionalMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & AdditionalUpdatePayload) => {
      const response = await api.put<ApiResponse<Additional>>(
        additionalApiEndpoints.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_) => {
      console.log("onSuccess", _);
      queryClient.invalidateQueries({
        queryKey: additionalKeys.lists(_.foodId),
      });
    },
  });
};

export const useDeleteAdditionalMutation = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string; foodId: string }) => {
      const response = await api.delete<ApiResponse<boolean>>(
        additionalApiEndpoints.delete(id)
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: additionalKeys.lists(variables.foodId),
      });
    },
  });
};
