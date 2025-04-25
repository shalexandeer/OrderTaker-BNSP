import { useQuery } from "@tanstack/react-query";
import { orderItemApiEndpoints, orderItemKeys } from "./keys";
import { OrderItem } from "./types";
import { ApiResponse } from "@/lib/types/api";
import api from "@/lib/axios";

export const useOrderItemsQuery = (orderId: string) => {
  return useQuery<OrderItem[]>({
    queryKey: orderItemKeys.lists(orderId),
    queryFn: async () => {
      const response = await api.get<ApiResponse<OrderItem[]>>(
        orderItemApiEndpoints.list(orderId)
      );
      return response.data.data;
    },
    enabled: !!orderId,
  });
};
