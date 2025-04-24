import axios, { AxiosResponse } from "axios";
import { getBasicHeader, getBearerHeader } from "../../utils/services";
import { BASE_URL } from "./../url";
import axiosInstance from "../axiosInstance";

function login(
  username: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> {
  const url = `${BASE_URL}/api/admin/login`;
  const token = window.btoa(`${username}:${password}`);

  return axiosInstance.post(
    url,
    { username, password },
    { headers: getBasicHeader(token) },
  );
}

function register(body: RegisterBody): Promise<AxiosResponse<AuthResponse>> {
  const url = `/auth/register`;

  return axiosInstance.post(url, body);
}

function logout() {
  const url = `${BASE_URL}/api/auth/logout`;
  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken)
    return axios.patch(url, {}, { headers: getBearerHeader(refreshToken) });
  else console.error("No refresh token found");
}

export const AuthServices = {
  login,
  register,
  logout,
};
