import { useMutation } from "@tanstack/react-query";
import { orderItemApiEndpoints, orderItemKeys } from "./keys";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import api from "@/lib/axios";
import { OrderItem, OrderItemCreatePayload } from "./types";

export const useCreateOrderItemMutation = () => {
  return useMutation({
    mutationFn: async ({
      orderId,
      payload,
    }: { orderId: string } & OrderItemCreatePayload) => {
      const response = await api.post<ApiResponse<OrderItem>>(
        orderItemApiEndpoints.create(orderId),
        payload
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderItemKeys.lists(variables.orderId),
      });
    },
  });
};

export const useDeleteOrderItemMutation = () => {
  return useMutation({
    mutationFn: async ({
      orderId,
      itemId,
    }: {
      orderId: string;
      itemId: string;
    }) => {
      const response = await api.delete<ApiResponse<boolean>>(
        orderItemApiEndpoints.delete(orderId, itemId)
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderItemKeys.lists(variables.orderId),
      });
    },
  });
};
