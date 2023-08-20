import { usersApi } from "@/api/users";
import { UserProfile } from "@/utils/types";
import { useForm } from "vee-validate";
import { getToken } from "@/utils/helper";

export function useProfile() {
  const userStore = useUserStore();
  const toast = useToastStore();
  const isLoading = ref<boolean>(false);

  const initData = {
    name: "",
    email: "",
    photoUrl: "",
    locale: "",
    theme: "",
    isAdmin: false,
  };

  const userProfile: Ref<UserProfile> = computed(() =>
    userStore.user ? userStore.user : initData
  );

  const { defineInputBinds, handleSubmit, handleReset } = useForm({
    initialValues: {
      name: userProfile.value.name,
      email: userProfile.value.email,
      photoUrl: userProfile.value.photoUrl,
      locale: userProfile.value.locale,
      theme: userProfile.value.theme,
      isAdmin: userProfile.value.isAdmin,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      isLoading.value = true;
      const { data } = await usersApi.updateUser(
        getToken(),
        values as UserProfile
      );
      toast.sendToast("Success", data.message, "success", 3000);
    } catch (error) {
      if (error.response) {
        toast.sendToast(
          "Error",
          error.response.data.message || "Something went wrong",
          "error",
          3000
        );
      } else {
        toast.sendToast(
          "Error",
          error.message || "Something went wrong",
          "error",
          3000
        );
      }
    } finally {
      isLoading.value = false;
    }
  });

  const name = defineInputBinds("name");
  const email = defineInputBinds("email");
  const photoUrl = defineInputBinds("photoUrl");
  const locale = defineInputBinds("locale");
  const theme = defineInputBinds("theme");
  const isAdmin = defineInputBinds("isAdmin");

  return {
    userStore,
    isLoading,
    userProfile,
    onSubmit,
    handleReset,
    name,
    email,
    photoUrl,
    locale,
    theme,
    isAdmin,
  };
}
