import { useQuery } from "@tanstack/react-query";
import FoodService from "./meja.url";

export const useGetMejaById = (mejaId: string) => {
  return useQuery({
    queryKey: ["meja", mejaId],
    queryFn: async () => {
      const { data } = await FoodService.getMejaById(mejaId);
      return data.data;
    },
  });
};
