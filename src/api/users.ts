import { LoginForm, SignUpForm } from "@/utils/types";
import axios from "axios";
import axiosClient from "./axiosClient";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

/**
 *
 * @param form
 * @returns
 * @deprecated
 */
function loginApi(form: LoginForm) {
  return axios.post("api/v1/users/signin", form);
}

/**
 *
 * @param token
 * @returns
 * @deprecated
 */
function getUser(token: string) {
  return axios.get(`api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { loginApi, getUser };

export const usersApi = {
  login: (form: LoginForm) => {
    const url = "api/v1/users/signin";
    return axiosClient.post(url, form);
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
};
