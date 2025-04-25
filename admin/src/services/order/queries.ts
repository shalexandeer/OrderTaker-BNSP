import { useQuery } from "@tanstack/react-query";
import { orderApiEndpoints, orderKeys } from "./keys";
import { Order } from "./types";
import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/types/api";
import axiosInstance from "../axiosInstance";

interface ParamsWithStatus extends PaginationParams {
  status?:
    | "pending"
    | "approved"
    | "preparing"
    | "completed"
    | "cancelled"
    | undefined;
}

export const useOrderListQuery = (params?: ParamsWithStatus) => {
  return useQuery<{
    data: Order[];
    pagination: ApiResponseWithPagination<Order[]>["pagination"];
  }>({
    queryKey: [...orderKeys.lists(), params],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseWithPagination<Order[]>
      >(orderApiEndpoints.list, { params });
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    },
  });
};

export const useOrderByIdQuery = (id: string) => {
  return useQuery<Order>({
    queryKey: orderKeys.details(id),
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Order>>(
        orderApiEndpoints.get(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
