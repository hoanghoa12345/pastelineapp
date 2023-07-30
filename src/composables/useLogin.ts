import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export function useLogin() {
  const userStore = useUserStore();

  const schema = toTypedSchema(
    yup.object({
      email: yup.string().email().required().label("Email"),
      password: yup.string().min(6).required().label("Password"),
      remember: yup.bool().oneOf([true]).label("Remember me"),
    })
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const signIn = handleSubmit((value) => {
    userStore.login({ email: value.email, password: value.password });
  });

  const signOut = () => {
    userStore.logout();
  };

  const getProfile = () => {
    userStore.getProfile();
  };

  const email = defineInputBinds("email");
  const password = defineInputBinds("password");
  const remember = defineInputBinds("remember");
  return {
    email,
    password,
    remember,
    signIn,
    signOut,
    getProfile,
    userStore,
    errors,
  };
}
