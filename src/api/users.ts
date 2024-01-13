import { LoginForm, SignUpForm, UserProfile } from "@/utils/types";
import axios from "axios";
import axiosClient from "./axiosClient";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

export const usersApi = {
  login: (form: LoginForm) => {
    const url = "api/v1/users/login";
    return axiosClient.post(url, form, {
      withCredentials: true,
    });
  },
  getUser: (token: string) => {
    const url = "api/v1/users/me";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.get(url, { headers });
  },
  register: (form: SignUpForm) => {
    const url = "api/v1/users/signup";
    return axiosClient.post(url, form);
  },
  verifyEmail: (token: string) => {
    const url = `api/v1/users/verify?token=${token}`;
    return axiosClient.get(url);
  },
  requestResetPassword: (email: string) => {
    const url = "api/v1/users/forgot";
    return axiosClient.post(url, { email });
  },
  confirmResetPassword: (token: string, password: string) => {
    const url = "api/v1/users/reset";
    return axiosClient.post(url, { token, password });
  },
  updateUser: (token: string, form: UserProfile) => {
    const url = "api/v1/users";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, form, { headers });
  },
  changePassword: (token: string, form: { oldPassword: string; newPassword: string }) => {
    const url = "api/v1/users/change-password";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, form, { headers });
  },
  resendEmail: (email: string) => {
    const url = "api/v1/users/send-verify";
    return axiosClient.post(url, { email });
  },
  refreshToken: () => {
    const url = "api/v1/users/refresh-token";
    return axiosClient.get(url);
  },
  logout: () => {
    const url = "api/v1/users/logout";
    return axiosClient.get(url);
  },
};
