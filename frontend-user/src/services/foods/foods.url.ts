import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";

const getFoods = (params: { categoryId: string | null }) => {
  const url = `${BASE_URL}/foods`;
  return axiosInstance.get(url, {
    params: {
      ...params,
      page: 1,
      pageSize: 100,
    },
  });
};

const getFoodsBySearch = (params: { search: string }) => {
  const url = `${BASE_URL}/foods/search`;
  return axiosInstance.get(url, { params });
};

const getFoodById = (foodId: string) => {
  const url = `${BASE_URL}/foods/${foodId}`;
  return axiosInstance.get(url);
};

const getAdditionalFood = (foodId: string) => {
  const url = `${BASE_URL}/foods/${foodId}/additionals`;
  return axiosInstance.get(url);
};

const FoodService = {
  getFoods,
  getFoodsBySearch,
  getFoodById,
  getAdditionalFood,
};

export default FoodService;
