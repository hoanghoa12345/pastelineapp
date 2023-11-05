import { usersApi } from "@/api/users";
import { UserProfile } from "@/utils/types";
import { useForm } from "vee-validate";
import { getToken } from "@/utils/helper";
import { toast } from "vue3-toastify";

export function useProfile() {
  const userStore = useUserStore();
  const isLoading = ref<boolean>(false);

  const initData = {
    name: "",
    email: "",
    photoUrl: "",
    locale: "",
    theme: "",
    isAdmin: false,
  };

  const userProfile: Ref<UserProfile> = computed(() => (userStore.user ? userStore.user : initData));

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
      const { data } = await usersApi.updateUser(getToken(), values as UserProfile);
      toast.success(data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
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
