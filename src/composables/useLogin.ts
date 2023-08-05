import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export function useLogin() {
  const userStore = useUserStore();

  const schema = toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, { message: "Password must contain at least 6 characters" }),
      remember: z.boolean().optional(),
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
