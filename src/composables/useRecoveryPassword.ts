import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import { toast } from "vue3-toastify";

export function useRecoveryPassword() {
  const isLoading = ref(false);
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
      toast.error("Token is required");
      return;
    }
    try {
      isLoading.value = true;
      const { data } = await usersApi.confirmResetPassword(token.toString(), values.password);
      toast.success(data.message);
      result.status = "success";
      result.message = data.message;
    } catch (error) {
      result.status = "error";
      if (error.response) {
        result.message = error.response.data.message || "Something went wrong";
        toast.error(error.response.data.message);
      } else {
        result.message = error.message || "Something went wrong";
        toast.error(error.message);
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
