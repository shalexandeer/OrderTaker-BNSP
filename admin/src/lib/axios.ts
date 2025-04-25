import axios, { AxiosError } from "axios";
import { getToken, removeToken } from "./helpers/cookies";
import { ApiResponse } from "./types/api";

const API_BASE_URL = "http://localhost:6969/api/";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + token,
  },
  timeout: 20000,
  timeoutErrorMessage: "Periksa Kembali Koneksi Internet Anda.",
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(function (config) {
  if (config.headers) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<ApiResponse<boolean>>) => {
    console.log("ini native error", error);
    // Parse error
    if (error.response?.data?.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response?.data,
            message:
              typeof error.response.data.message === "string"
                ? error.response.data.message
                : Object.values(
                    error.response.data.message as Record<string, string[]>
                  )[0][0],
          },
        },
      });
    }

    // Handle token expiration (401 errors)
    if (error.response?.status === 401) {
      // Remove token if it's expired
      removeToken();

      // Redirect to login page if needed
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
