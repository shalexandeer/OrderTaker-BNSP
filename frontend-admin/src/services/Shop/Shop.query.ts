import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ShopServices } from "./Shop.url";

// Hook to fetch all items
export const useGetAllItems = (params: ParamsBody) => {
  return useQuery({
    queryKey: ["item-mall", params],
    queryFn: async () => {
      const response = await ShopServices.getAllItems(params);
      return response?.data;
    },
  });
};
export const useGetItemMallById = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["item-mall-id", id],
    queryFn: async () => {
      const response = await ShopServices.getItemsById(id);
      return response?.data;
    },
    enabled
  });
};

// Hook to search items in the mall
export const useSearchItemMall = (params: ParamsBody) => {
  return useQuery({
    queryKey: ["item-mall", params],
    queryFn: async () => {
      const response = await ShopServices.searchItemMall(params);
      return response?.data;
    },
    enabled: (params.querySearch?.length ?? 0) > 3,
  });
};

// Hook to get item categories
export const useGetItemMallCategory = () => {
  return useQuery<ItemMallCategoryResponse>({
    queryKey: ["item-mall-category"],
    queryFn: async () => {
      const response = await ShopServices.getItemMallCategory();
      return response?.data;
    },
  });
};

// Hook to create an item in the mall
export function useCreateItemMall(
  options?: UseMutationOptions<ItemMallResponse, AxiosError, ItemMallBody>
) {
  const { mutate, isPending, isSuccess } = useMutation<ItemMallResponse, AxiosError, ItemMallBody>({
    mutationFn: async (data: ItemMallBody) => {
      const response = await ShopServices.createItemMall(data);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

// Hook to update an item in the mall
export function useUpdateItemMall(
  options?: UseMutationOptions<ItemMallResponse, AxiosError, { data: ItemMallBody; id: string }>
) {
  const { mutate, isPending, isSuccess } = useMutation<ItemMallResponse, AxiosError, { data: ItemMallBody; id: string }>({
    mutationFn: async ({ data, id }) => {
      const response = await ShopServices.updateItemMall(data, id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}

// Hook to delete an item from the mall
export function useDeleteItemMall(
  options?: UseMutationOptions<ItemMallResponse, AxiosError, string>
) {
  const { mutate, isPending, isSuccess } = useMutation<ItemMallResponse, AxiosError, string>({
    mutationFn: async (id: string) => {
      const response = await ShopServices.deleteItemMall(id);
      return response?.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return { mutate, isPending, isSuccess };
}
