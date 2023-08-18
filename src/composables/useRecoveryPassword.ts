import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export function useRecoveryPassword() {
  const isLoading = ref(false);

  const schema = toTypedSchema(
    z
      .object({
        password: z
          .string({
            required_error: "Password is required",
          })
          .min(6, "Minium length of password is 6"),
        confirmPassword: z
          .string({
            required_error: "Confirm password is required",
          })
          .min(6, "Minium length of password is 6"),
      })
      .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Password and confirm password doesn't match",
        path: ["confirmPassword"],
      })
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const password = defineInputBinds("password");
  const confirmPassword = defineInputBinds("confirmPassword");

  const requestResetPassword = handleSubmit(async (values) => {
    console.log(values);
  });

  return {
    password,
    confirmPassword,
    requestResetPassword,
    isLoading,
    errors,
  };
}
