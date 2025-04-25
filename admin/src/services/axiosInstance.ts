// src/api/axiosInstance.ts
import axios from "axios";
import { isTokenExpired } from "./auth";

export const FRONTEND_URL = "http://localhost:5173"; // Replace with your frontend URL
export const RESTAURANT_ID = "6b6e78c0-ef70-4f3f-8d32-2816a57dafd1"; // Replace with your restaurant ID

const axiosInstance = axios.create({
  baseURL: `http://localhost:6969/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token"); // or wherever you store the token

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("access_token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  async (config) => {
    if (config.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // Redirect to login page
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      // Store the current path as a redirect parameter
      const currentPath = window.location.pathname;
      const loginRedirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
      window.location.href = loginRedirectUrl;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
