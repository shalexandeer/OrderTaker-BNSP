import { useQuery } from "@tanstack/react-query";
import HotelService from "./hotel.url";

export const useGetRestaurantProfile = (restaurantProfile: string) => {
  return useQuery({
    queryKey: ["restaurant-profile", restaurantProfile],
    queryFn: async () => {
      const { data } =
        await HotelService.getRestaurantProfile(restaurantProfile);
      return data.data;
    },
  });
};
