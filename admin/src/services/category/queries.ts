import { useQuery } from "@tanstack/react-query";
import { categoryApiEndpoints, categoryKeys } from "./keys";
import { Category } from "./types";
import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/types/api";
import axiosInstance from "./../axiosInstance";

export const useCategoryListQuery = (params?: PaginationParams) => {
  return useQuery<{
    data: Category[];
    pagination: PaginationParams;
  }>({
    queryKey: categoryKeys.lists(),
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseWithPagination<Category[]>
      >(categoryApiEndpoints.list, { params });

      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    },
  });
};

export const useCategoryByIdQuery = (id: string) => {
  return useQuery<Category>({
    queryKey: categoryKeys.details(id),
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Category>>(
        categoryApiEndpoints.get(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
