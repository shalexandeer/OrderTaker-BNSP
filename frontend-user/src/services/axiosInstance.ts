import axios from "axios";
import { BASE_URL } from "./url";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
    "allow-origin": "*",
  },
});

export default axiosInstance;
