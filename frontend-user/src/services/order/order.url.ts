import { OrderPayload } from "../../interface/global";
import axiosInstance from "../axiosInstance";
import { BASE_URL } from "../url";

const createOrder = (data: OrderPayload) => {
  const url = `${BASE_URL}/orders`;
  return axiosInstance.post(url, data);
};

const OrderService = {
  createOrder,
};

export default OrderService;
