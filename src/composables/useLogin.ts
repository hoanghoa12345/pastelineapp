import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { baseUrl } from "@/api/axiosClient";
import Cookies from "js-cookie";

export function useLogin() {
  const userStore = useUserStore();
  // const router = useRouter();
  const ssoLoading = ref(false);
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
    initialValues: {
      email: localStorage.getItem("email") || "",
    },
  });

  const signIn = handleSubmit((value) => {
    localStorage.setItem("remember", value.remember ? "true" : "false");
    localStorage.setItem("email", value.email);
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

  const handleLoginSSO = () => {
    window.location.href = baseUrl + "/sso";
    ssoLoading.value = true;
  };

  onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    const expiration = params.get("expiration");
    const refreshToken = params.get("refreshToken");
    if (access_token) {
      Cookies.set("access_token", access_token);
      Cookies.set("expiration", expiration);
      Cookies.set("refresh_token", refreshToken);
      window.location.href = "/";
    }
  });

  return {
    email,
    password,
    remember,
    signIn,
    signOut,
    getProfile,
    userStore,
    errors,
    handleLoginSSO,
    ssoLoading,
  };
}
