import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";

const getRestaurantProfile = (restaurantId: string) => {
  const url = `${BASE_URL}/restaurant/${restaurantId}`;
  return axiosInstance.get(url);
};

const RestaurantService = {
  getRestaurantProfile,
};

export default RestaurantService;
