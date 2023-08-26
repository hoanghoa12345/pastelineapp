import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import EmailJS, { EmailJSResponseStatus } from "@emailjs/browser";

export const useForgotPassword = () => {
  const isLoading = ref(false);
  const toast = useToastStore();
  const schema = toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      acceptTerms: z.boolean({
        required_error: "You must accept the policy terms and conditions",
      }),
    })
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const email = defineInputBinds("email");
  const acceptTerms = defineInputBinds("acceptTerms");

  const sendRequest = handleSubmit(async (values) => {
    try {
      isLoading.value = true;
      const { data } = await usersApi.requestResetPassword(values.email);
      const result: EmailJSResponseStatus = await EmailJS.send(
        "service_ydm001",
        "template_51swfqn",
        {
          to_email: values.email,
          link_token: data.data?.token,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      if (result.status === 200) {
        toast.sendToast("Success", data.message, "success", 3000);
      } else {
        toast.sendToast("Error", result.text, "error", 3000);
      }
    } catch (error) {
      if (error.response)
        toast.sendToast(
          "Error",
          error.response.data.message || "Something went wrong",
          "error",
          3000
        );
      toast.sendToast(
        "Error",
        error.message || "Something went wrong",
        "error",
        3000
      );
    } finally {
      isLoading.value = false;
    }
  });

  return {
    email,
    acceptTerms,
    sendRequest,
    errors,
    isLoading,
  };
};
