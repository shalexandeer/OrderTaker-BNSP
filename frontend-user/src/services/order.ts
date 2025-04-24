import axios from "axios";
import { getBearerHeader } from "../utils/services";
import { BASE_URL } from "./url";

function insertOrder(token: string, hotelId: number, order: OrderData) {
  const url = `${BASE_URL}/hotels/${hotelId}/order`
  return axios.post(url, JSON.stringify(order), { headers: getBearerHeader(token) })
}

function getOrders(token: string, hotelId: number) {
  const url = `${BASE_URL}/hotels/${hotelId}/order`
  return axios.get(url, { headers: getBearerHeader(token) })
}

function useGetOrdersByRoomId(hotelId: number, roomId: number) {
  const url = `${BASE_URL}/hotels/${hotelId}/order/${roomId}`
  return url
}

function getOrdersByRoomId(token: string, hotelId: number, roomId: number | string) {
  const url = `${BASE_URL}/hotels/${hotelId}/order/${roomId}`
  return axios.get(url, { headers: getBearerHeader(token) })
}


const OrderService = {
  insertOrder,
  getOrders,
  getOrdersByRoomId,
  useGetOrdersByRoomId
}

export default OrderService;

