import { useQuery } from "@tanstack/react-query";
import FoodCategories from "./category.url";

export const useGetFoodCategories = (hotelId: number) => {
  return useQuery({
    queryKey: ["food-categories"],
    queryFn: async () => {
      const { data } = await FoodCategories.getFoodCategories(hotelId);
      return data.data;
    },
  });
};
