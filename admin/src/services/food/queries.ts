import { useQuery } from "@tanstack/react-query";
import { foodApiEndpoints, foodKeys } from "./keys";
import { Food } from "./types";
import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/types/api";
import axiosInstance from "../axiosInstance";

export const useFoodListQuery = (params?: PaginationParams) => {
  return useQuery<{
    data: Food[];
    pagination: PaginationParams;
  }>({
    queryKey: [...foodKeys.lists(), params],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseWithPagination<Food[]>
      >(foodApiEndpoints.list, { params });
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    },
  });
};

export const useFoodByIdQuery = (id: string) => {
  return useQuery<Food>({
    queryKey: foodKeys.details(id),
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Food>>(
        foodApiEndpoints.get(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useFoodByCategoryQuery = (categoryId: string) => {
  return useQuery<Food[]>({
    queryKey: [...foodKeys.lists(), categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Food[]>>(
        foodApiEndpoints.byCategory(categoryId)
      );
      return response.data.data;
    },
    enabled: !!categoryId,
  });
};
