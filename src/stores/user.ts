import { defineStore } from "pinia";
import { getUser, loginApi } from "@/api/users";
import Cookies from "js-cookie";
import { generateFromString } from "generate-avatar";
import { AxiosError } from "axios";
import { LoginForm } from "@/utils/types";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoading = ref<boolean>(false);
  const router = useRouter();
  const isError = ref<boolean>(false);
  const errorCode = ref<string>(null);

  async function login(form: LoginForm) {
    try {
      isLoading.value = true;
      isError.value = false;
      const { data } = await loginApi(form);

      if (data.data?.access_token) {
        Cookies.set("access_token", data.data?.access_token);
      }

      if (data?.data?.user) {
        user.value = data?.user;
      }

      router.push("/");
    } catch (error) {
      isError.value = true;
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
      isError.value = false;
      const { data } = await getUser(token);
      if (data.photoUrl === "" || data.photoUrl == null) {
        data.photoUrl = `data:image/svg+xml;utf8,${generateFromString(
          data.email
        )}`;
      }
      user.value = data;
    } catch (error) {
      isError.value = false;
      if (error instanceof AxiosError) {
        errorCode.value = error.code;
      }
      throw Error(error);
    }
  }

  return { isLoading, user, login, logout, getProfile, isError, errorCode };
});
