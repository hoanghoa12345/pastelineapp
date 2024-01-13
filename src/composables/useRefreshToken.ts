import Cookies from "js-cookie";
import { usersApi } from "@/api/users";

export const useRefreshToken = () => {
  const tokenExpiration = ref<Number>();

  const handleTokenExpiration = () => {
    tokenExpiration.value = Cookies.get("expiration");
    console.log("tokenExpiration", tokenExpiration.value);
    if (tokenExpiration.value) {
      const now = new Date();
      const tokenExpirationDate = new Date(Number(tokenExpiration.value));
      console.log("tokenExpirationDate: ", tokenExpirationDate);
      const triggerAfterMs = tokenExpirationDate.getTime() - now.getTime();
      console.log("Refresh token: ", triggerAfterMs);
      setTimeout(async () => {
        const { data } = await usersApi.refreshToken();
        console.log("Refreshed from composable", data);
        Cookies.set("access_token", data.data.access_token);
        Cookies.set("expiration", data.data.expiration);
      }, triggerAfterMs);
    }
  };

  onMounted(() => {
    handleTokenExpiration();
  });

  return { tokenExpiration };
};
