import { useMutation } from "@tanstack/react-query";
import { foodApiEndpoints, foodKeys } from "./keys";
import { Food, FoodCreatePayload, FoodUpdatePayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import axiosInstance from "./../axiosInstance";

export const useCreateFoodMutation = () => {
  return useMutation({
    mutationFn: async (payload: FoodCreatePayload) => {
      const response = await axiosInstance.post<ApiResponse<Food>>(
        foodApiEndpoints.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
    },
  });
};

export const useUpdateFoodMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & FoodUpdatePayload) => {
      const response = await axiosInstance.put<ApiResponse<Food>>(
        foodApiEndpoints.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
    },
  });
};

export const useDeleteFoodMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<ApiResponse<boolean>>(
        foodApiEndpoints.delete(id)
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foodKeys.lists() });
    },
  });
};

export const useUploadMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post("/upload", formData);
      return response.data.url; // Return the image URL
    },
  });
};
