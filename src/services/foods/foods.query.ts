import { useQuery } from "@tanstack/react-query";
import FoodService from "./foods.url";

export const useGetFoods = (categoryId: string | null) => {
  return useQuery({
    queryKey: ["foods", categoryId],
    queryFn: async () => {
      const { data } = await FoodService.getFoods({
        categoryId,
      });
      return data.data;
    },
  });
};

export const useSearchFoods = (params: { search: string }) => {
  return useQuery({
    queryKey: ["search-foods", params],
    queryFn: async () => {
      const { data } = await FoodService.getFoodsBySearch(params);
      return data.data;
    },
    enabled: params.search !== "",
  });
};

export const useGetFoodById = (id: string) => {
  return useQuery({
    queryKey: ["food-by-id", id],
    queryFn: async () => {
      const { data } = await FoodService.getFoodById(id);
      return data.data;
    },
  });
};

export const useGetFoodAdditionals = (id: string) => {
  return useQuery({
    queryKey: ["food-additional", id],
    queryFn: async () => {
      const { data } = await FoodService.getAdditionalFood(id);
      return data.data;
    },
  });
};
