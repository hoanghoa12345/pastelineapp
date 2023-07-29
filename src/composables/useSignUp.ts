import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs, not } from "@vuelidate/validators";

export function useSignUp() {
  const userStore = useUserStore();

  const form = reactive({
    email: "",
    password: {
      password: "",
      confirm: "",
    },
    acceptTerms: false,
  });

  const rules = {
    email: { required, email },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: {
        required,
        sameAs: sameAs(form.password.password, "password"),
      },
    },
    acceptTerms: { not: not(sameAs(false)) },
  };

  const v$ = useVuelidate(rules, form);

  const signUp = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    console.log(form);
  };

  return {
    form,
    signUp,
    userStore,
    v$,
  };
}
