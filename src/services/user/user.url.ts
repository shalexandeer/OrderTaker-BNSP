import axios from "axios";
import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";

const getUserInfo = (hotelId: number, roomNo: number) => {
  const url = `${BASE_URL}/${hotelId}/room/${roomNo}`;
  return axiosInstance.get(url);
};

const UserService = {
  getUserInfo,
};

export default UserService;
