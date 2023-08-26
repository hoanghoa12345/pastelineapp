import { defineStore } from "pinia";
import { usersApi } from "@/api/users";
import Cookies from "js-cookie";
import { generateFromString } from "generate-avatar";
import { AxiosError } from "axios";
import { LoginForm } from "@/utils/types";

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
        Cookies.set("access_token", data.data?.access_token);
      }

      if (data?.data?.user) {
        user.value = data?.user;
      }

      router.push("/");
    } catch (error) {
      authError.isError = true;
      authError.errorMessage = error.message;
      if (error instanceof AxiosError && error.response) {
        authError.errorMessage = error.response.data.message;
      }
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    Cookies.remove("access_token");
    router.replace("/login");
  }

  async function getProfile() {
    const token = Cookies.get("access_token");
    try {
      authError.isError = false;
      authError.errorMessage = null;
      const { data } = await usersApi.getUser(token);
      if (data.photoUrl === "" || data.photoUrl == null) {
        data.photoUrl = `data:image/svg+xml;utf8,${generateFromString(
          data.email
        )}`;
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
      throw Error(error);
    }
  }

  return { isLoading, user, login, logout, getProfile, authError, errorCode };
});
