import { defineStore } from "pinia";
import { getUser, loginApi } from "@/api/users";
import Cookies from "js-cookie";
import { LoginForm } from "@/utils/types";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoading = ref(false);
  const router = useRouter();

  async function login(form: LoginForm) {
    // Cookies.set("timestamp", Date.now());
    try {
      console.log(form);
      isLoading.value = true;
      const { data } = await loginApi(form);

      if (data.data.access_token) {
        Cookies.set("access_token", data.data?.access_token);
      }

      if (data?.data?.user) {
        // Cookies.set("userId", data.data?.user?.userId);
        user.value = data?.user;
        // localStorage.setItem("user", JSON.stringify(user.value));
      }

      console.log(data);
      router.push("/");
    } catch (error) {
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    Cookies.remove("access_token");
    // Cookies.remove("userId");
    // localStorage.removeItem("user");
    router.replace("/login");
  }

  async function getProfile() {
    // const userId = Cookies.get("userId");
    const token = Cookies.get("access_token")
    try {
      const { data } = await getUser(token);
      if(data.photoUrl === '' || data.photoUrl == null) {
        data.photoUrl = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y'
      }
      user.value = data;
    } catch (error) {
      throw Error(error);
    }
  }

  return { isLoading, user, login, logout, getProfile };
});
