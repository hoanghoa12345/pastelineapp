import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { usersApi } from "@/api/users";
import EmailJs from "@emailjs/browser";

export function useSignUp() {
  const userStore = useUserStore();
  const isLoading = ref(false);
  const isOpen = ref(false);
  const result = reactive({
    status: "",
    message: "",
  });
  const emailToResend = ref("");
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

  const signUp = handleSubmit(async (values) => {
    const form = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      acceptTerms: values.acceptTerms ? "true" : "false",
    };
    try {
      isLoading.value = true;
      const { data } = await usersApi.register(form);
      result.status = "success";
      result.message = data.data.message;
      emailToResend.value = form.email;
      const sendResult = await EmailJs.send(
        "service_ydm001",
        "template_puu8yes",
        {
          to_email: form.email,
          link_token: data.data?.token,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      isOpen.value = true;
      if (sendResult.status === 200) {
        toast.sendToast("Success", data.data.message, "success", 3000);
      } else {
        toast.sendToast("Error", sendResult.text, "error", 3000);
      }
    } catch (error) {
      isOpen.value = true;
      result.status = "error";
      if (error.response) result.message = error.response.data.message;
      else result.message = "Something went wrong";
      toast.sendToast("Error", result.message, "error", 3000);
    } finally {
      isLoading.value = false;
    }
  });

  const resendEmail = async () => {
    if (emailToResend.value === "") return;

    try {
      const { data } = await usersApi.resendEmail(emailToResend.value);
      EmailJs.send(
        "ytm001",
        "template_puu8yes",
        {
          to_email: email,
          link_token: data.data?.token,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      toast.sendToast("Success", data.message, "success", 3000);
    } catch (error) {
      toast.sendToast("Error", error.response.data.message, "error", 3000);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    acceptTerms,
    signUp,
    userStore,
    errors,
    schema,
    isLoading,
    isOpen,
    result,
    resendEmail,
  };
}
