import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import EmailJS, { EmailJSResponseStatus } from "@emailjs/browser";
import { toast } from "vue3-toastify";

export const useForgotPassword = () => {
  const isLoading = ref(false);
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
        toast.success(data.message);
      } else {
        toast.error(result.text);
      }
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      toast.error(error.message);
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
