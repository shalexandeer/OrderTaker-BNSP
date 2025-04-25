import { useMutation } from "@tanstack/react-query";
import { categoryApiEndpoints, categoryKeys } from "./keys";
import {
  Category,
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "./types";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import axiosInstance from "../axiosInstance";

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: async (payload: CategoryCreatePayload) => {
      const response = await axiosInstance.post<ApiResponse<Category>>(
        categoryApiEndpoints.create,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & CategoryUpdatePayload) => {
      const response = await axiosInstance.put<ApiResponse<Category>>(
        categoryApiEndpoints.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<ApiResponse<boolean>>(
        categoryApiEndpoints.delete(id)
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};
