import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";

export function useRecoveryPassword() {
  const isLoading = ref(false);
  const toast = useToastStore();
  const route = useRoute();
  const { token } = route.query;
  const result = reactive({
    status: "idle",
    message: "",
  });
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
    if (!token) {
      toast.sendToast("Error", "Token is required", "error", 3000);
      return;
    }
    try {
      isLoading.value = true;
      const { data } = await usersApi.confirmResetPassword(
        token.toString(),
        values.password
      );
      toast.sendToast("Success", data.message, "success", 3000);
      result.status = "success";
      result.message = data.message;
    } catch (error) {
      result.status = "error";
      if (error.response) {
        result.message = error.response.data.message || "Something went wrong";
        toast.sendToast(
          "Error",
          error.response.data.message || "Something went wrong",
          "error",
          3000
        );
      } else {
        result.message = error.message || "Something went wrong";
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

  return {
    password,
    confirmPassword,
    requestResetPassword,
    isLoading,
    errors,
    result,
  };
}
