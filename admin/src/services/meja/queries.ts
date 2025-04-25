import { useQuery } from "@tanstack/react-query";
import { mejaApiEndpoints, mejaKeys } from "./keys";
import { Meja } from "./types";
import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/types/api";
import api from "@/lib/axios";

export const useMejaListQuery = (params?: PaginationParams) => {
  return useQuery<{
    data: Meja[];
    pagination: ApiResponseWithPagination<Meja[]>["pagination"];
  }>({
    queryKey: [...mejaKeys.lists(), params],
    queryFn: async () => {
      const response = await api.get<ApiResponseWithPagination<Meja[]>>(
        mejaApiEndpoints.list,
        { params }
      );

      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    },
  });
};

export const useMejaByIdQuery = (id: string) => {
  return useQuery<Meja>({
    queryKey: mejaKeys.details(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Meja>>(
        mejaApiEndpoints.get(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
