import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";

const getMejaById = (mejaId: string) => {
  const url = `${BASE_URL}/meja/${mejaId}`;
  return axiosInstance.get(url);
};

const MejaService = {
  getMejaById,
};

export default MejaService;
