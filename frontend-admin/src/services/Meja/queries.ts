import { useQuery } from "@tanstack/react-query";
import { mejaApiEndpoints, mejaKeys } from "./keys";
import { Meja } from "./types";
import axiosInstance from "./../axiosInstance";
import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/types/api";

export const useMejaListQuery = (params?: PaginationParams) => {
  return useQuery<Meja[]>({
    queryKey: mejaKeys.lists(),
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseWithPagination<Meja[]>
      >(mejaApiEndpoints.list, { params });
      return response.data.data;
    },
  });
};

export const useMejaByIdQuery = (id: string) => {
  return useQuery<Meja>({
    queryKey: mejaKeys.details(id),
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Meja>>(
        mejaApiEndpoints.get(id),
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
