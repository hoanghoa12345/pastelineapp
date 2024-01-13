import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !(error.config as CustomAxiosRequestConfig)._retry) {
      (error.config as CustomAxiosRequestConfig)._retry = true;
      Cookies.remove("access_token");
      try {
        const { data } = await axiosClient.get("api/v1/users/refresh-token");
        Cookies.set("access_token", data.data.access_token);
        Cookies.set("expiration", data.data.expiration);
      } catch (error) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
