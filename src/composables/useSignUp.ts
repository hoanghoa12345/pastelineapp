import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export function useSignUp() {
  const userStore = useUserStore();

  const toast = useToastStore();

  const schema = toTypedSchema(
    z
      .object({
        email: z
          .string({
            required_error: "Email is required",
          })
          .email(),
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
        acceptTerms: z.boolean({
          required_error: "You must accept the policy terms and conditions",
        }),
      })
      .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Password and confirm password doesn't match",
        path: ["confirmPassword"],
      })
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const email = defineInputBinds("email");
  const password = defineInputBinds("password");
  const confirmPassword = defineInputBinds("confirmPassword");
  const acceptTerms = defineInputBinds("acceptTerms");

  const signUp = handleSubmit((values) => {
    toast.sendToast("Error", "Registration is disabled", "error", 3000);
    console.log(values);
  });

  return {
    email,
    password,
    confirmPassword,
    acceptTerms,
    signUp,
    userStore,
    errors,
    schema,
  };
}
