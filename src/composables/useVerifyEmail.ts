import { usersApi } from "@/api/users";

export const useVerifyEmail = () => {
  const result = reactive({
    status: "",
    message: "",
  });
  const isLoading = ref(false);
  const route = useRoute();
  const { token } = route.query;

  watchEffect(async () => {
    if (!token) return;

    try {
      isLoading.value = true;
      await usersApi.verifyEmail(token.toString());
      result.status = "success";
      result.message = "Your email have been verified";
    } catch (error) {
      result.status = "error";
      result.message = "Error when verify email";
    } finally {
      isLoading.value = false;
    }
  });

  return {
    isLoading,
    result,
  };
};
