import { auth } from "@/utils/constants";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const baseUrl = import.meta.env.VITE_BASE_URL;

// Check vite is development or production
export const isDev = import.meta.env.DEV;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: isDev ? '/api' : baseUrl,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  let accessToken = Cookies.get(auth.ACCESS_TOKEN);
  if (!accessToken) {
    accessToken = sessionStorage.getItem(auth.ACCESS_TOKEN)
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !(error.config as CustomAxiosRequestConfig)._retry) {
      (error.config as CustomAxiosRequestConfig)._retry = true;
      Cookies.remove(auth.ACCESS_TOKEN);
      try {
        const { data } = await axiosClient.get("api/v1/users/refresh-token");
        Cookies.set(auth.ACCESS_TOKEN, data.data.access_token);
        Cookies.set("expiration", data.data.expiration);
      } catch (error) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
