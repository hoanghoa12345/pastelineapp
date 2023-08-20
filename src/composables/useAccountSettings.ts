import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import { getToken } from "@/utils/helper";

export function useAccountSettings() {
  const isLoading = ref(false);
  const toast = useToastStore();
  const route = useRoute();

  const schema = toTypedSchema(
    z
      .object({
        currentPassword: z
          .string({
            required_error: "Password is required",
          })
          .min(6, "Minium length of password is 6"),
        newPassword: z
          .string({
            required_error: "New password is required",
          })
          .min(6, "Minium length of password is 6"),
        confirmPassword: z
          .string({
            required_error: "Confirm password is required",
          })
          .min(6, "Minium length of password is 6"),
      })
      .refine(
        ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
        {
          message: "Password and confirm password doesn't match",
          path: ["confirmPassword"],
        }
      )
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const currentPassword = defineInputBinds("currentPassword");
  const newPassword = defineInputBinds("newPassword");
  const confirmPassword = defineInputBinds("confirmPassword");

  const onSubmit = handleSubmit(async (values) => {
    try {
      isLoading.value = true;
      const { data } = await usersApi.changePassword(getToken(), {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.sendToast("Success", data.message, "success", 3000);
    } catch (error) {
      if (error.response) {
        toast.sendToast(
          "Error",
          error.response.data.message || "Something went wrong",
          "error",
          3000
        );
      } else {
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
    isLoading,
    currentPassword,
    newPassword,
    confirmPassword,
    errors,
    onSubmit,
  };
}
