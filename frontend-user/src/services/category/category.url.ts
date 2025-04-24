import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";

const getFoodCategories = () => {
  const url = `${BASE_URL}/categories`;
  return axiosInstance.get(url);
};

const FoodCategories = {
  getFoodCategories,
};

export default FoodCategories;
