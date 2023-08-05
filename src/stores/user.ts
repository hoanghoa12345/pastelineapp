import { defineStore } from "pinia";
import { getUser, loginApi } from "@/api/users";
import Cookies from "js-cookie";
import { LoginForm } from "@/utils/types";
import { generateAvatar } from "@/utils/helper";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoading = ref<boolean>(false);
  const router = useRouter();
  const isError = ref<boolean>(false);

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
    const backgroundColor = "#1982c4";
    const textColor = "white";
    const token = Cookies.get("access_token");
    try {
      isError.value = false;
      const { data } = await getUser(token);
      if (data.photoUrl === "" || data.photoUrl == null) {
        data.photoUrl = await generateAvatar(
          data.name,
          textColor,
          backgroundColor
        );
      }
      user.value = data;
    } catch (error) {
      isError.value = false;
      throw Error(error);
    }
  }

  return { isLoading, user, login, logout, getProfile, isError };
});
