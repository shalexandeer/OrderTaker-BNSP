import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import OrderService from "./order.url";
import { OrderPayload, OrderResponse } from "../../interface/global";

export interface CreateOrderRequestData {
  data: OrderPayload;
}

export function useCreateOrder(
  options?: UseMutationOptions<OrderResponse, unknown, OrderResponse>,
) {
  const { mutate, isPending, isSuccess } = useMutation<
    OrderResponse,
    unknown,
    CreateOrderRequestData
  >({
    mutationFn: async ({ data }) => {
      const response = await OrderService.createOrder(data);
      return response?.data?.data;
    },
    onSuccess: options?.onSuccess as
      | ((
          data: OrderResponse,
          variables: CreateOrderRequestData,
          context: unknown,
        ) => unknown)
      | undefined,
    onError: options?.onError as
      | ((
          error: unknown,
          variables: CreateOrderRequestData,
          context: unknown,
        ) => unknown)
      | undefined,
  });

  return { mutate, isPending, isSuccess };
}
