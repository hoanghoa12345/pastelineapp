import { defineStore } from "pinia";
import { usersApi } from "@/api/users";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import { generateFromString } from "generate-avatar";
import { AxiosError } from "axios";
import { LoginForm } from "@/utils/types";
import { auth } from "@/utils/constants";

type AuthError = {
  isError: boolean;
  errorMessage: string;
};

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoading = ref<boolean>(false);
  const router = useRouter();
  const authError = reactive<AuthError>({
    isError: false,
    errorMessage: null,
  });

  const errorCode = ref<string>(null);

  async function login(form: LoginForm) {
    try {
      isLoading.value = true;
      authError.isError = false;
      authError.errorMessage = null;
      const { data } = await usersApi.login(form);

      if (data.data?.access_token) {
        Cookies.set(auth.ACCESS_TOKEN, data.data?.access_token);
        sessionStorage.setItem(auth.ACCESS_TOKEN, data.data?.access_token);
      }
      if (data.data?.expiration) {
        Cookies.set("expiration", data.data.expiration);
      }
      if (data?.data?.user) {
        user.value = data?.user;
      }

      window.localStorage.setItem("LOGIN", new Date().toISOString());

      router.push({path: "/", replace: true});
    } catch (error) {
      authError.isError = true;
      authError.errorMessage = error.message;
      if (error instanceof AxiosError && error.response) {
        authError.errorMessage = error.response.data.message;
      }
      toast.error(authError.errorMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    await usersApi.logout();
    toast.success("Logout successfully", { position: toast.POSITION.BOTTOM_RIGHT });
    Cookies.remove(auth.ACCESS_TOKEN);
    sessionStorage.removeItem(auth.ACCESS_TOKEN)
    window.localStorage.setItem("LOGOUT", new Date().toISOString());
    router.replace({ name: "Login" });
  }

  async function getProfile() {
    const token = Cookies.get(auth.ACCESS_TOKEN) || sessionStorage.getItem(auth.ACCESS_TOKEN);
    try {
      authError.isError = false;
      authError.errorMessage = null;
      const { data } = await usersApi.getUser(token);
      if (data.photoUrl === "" || data.photoUrl == null) {
        data.photoUrl = `data:image/svg+xml;utf8,${generateFromString(data.email)}`;
      }
      user.value = data;
    } catch (error) {
      authError.isError = true;
      authError.errorMessage = error.message;
      if (error.response) {
        authError.errorMessage = error.response.data.message;
      }
      if (error instanceof AxiosError) {
        errorCode.value = error.code;
      }
      // toast.error(authError.errorMessage, { position: toast.POSITION.BOTTOM_RIGHT });
      throw Error(error);
    }
  }

  return { isLoading, user, login, logout, getProfile, authError, errorCode };
});
