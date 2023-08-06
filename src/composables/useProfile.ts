import { UserProfile } from "@/utils/types";
import { useForm } from "vee-validate";

export function useProfile() {
  const userStore = useUserStore();

  const isLoading = ref<boolean>(false);

  const userProfile: Ref<UserProfile> = computed(() => userStore.user);

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

  const onSubmit = handleSubmit((values) => {
    console.log(JSON.stringify(values, null, 2));
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
