import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import { getToken } from "@/utils/helper";
import { toast } from "vue3-toastify";

export function useAccountSettings() {
  const isLoading = ref(false);
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
      .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
        message: "Password and confirm password doesn't match",
        path: ["confirmPassword"],
      })
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
      toast.success(data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
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
