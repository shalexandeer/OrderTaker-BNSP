import { useMutation } from "@tanstack/react-query";
import { orderApiEndpoints, orderKeys } from "./keys";
import { Order, OrderUpdatePayload } from "./types";
import { ApiResponse } from "@/lib/types/api";
import { queryClient } from "@/components/templates/ReactQueryLayout";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & OrderUpdatePayload) => {
      const response = await axiosInstance.put<ApiResponse<Order>>(
        orderApiEndpoints.update(id),
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success("Order updated successfully!");
    },
  });
};
