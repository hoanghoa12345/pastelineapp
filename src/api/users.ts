import { LoginForm } from "@/utils/types";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function loginApi(form: LoginForm) {
    return axios.post('api/v1/users/signin', form)
}

function getUser(userId: string, token: string) {
    return axios.get(`api/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    loginApi,
    getUser
}