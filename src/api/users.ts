import axios from "axios";

interface LoginParams {
    email: string,
    password: string,
}

axios.defaults.baseURL = import.meta.env.BASE_URL;

function loginApi(form: LoginParams) {
    return axios.post('api/v1/users/signin', form)
}

export {
    loginApi
}