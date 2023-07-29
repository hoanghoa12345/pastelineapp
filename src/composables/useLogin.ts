import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export function useLogin() {
  const userStore = useUserStore();

  const form = reactive({
    email: "",
    password: "",
    remember: false,
  });

  const rules = {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    remember: {},
  };

  const v$ = useVuelidate(rules, form);

  const signIn = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    userStore.login(form);
  };

  const signOut = () => {
    userStore.logout();
  };

  const getProfile = () => {
    userStore.getProfile();
  };

  return {
    form,
    signIn,
    signOut,
    getProfile,
    userStore,
    v$,
  };
}
