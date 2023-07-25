import { loginApi } from "@/api/users";
import Cookies from 'js-cookie'
export function useLogin() {
  const router = useRouter();

  const isLoading = ref(false)

  const form = reactive({
    email: "",
    password: "",
  });

  const signIn = async () => {
    Cookies.set('timestamp', Date.now())
    try {
      console.log(form);
      isLoading.value = true
      const { data } = await loginApi(form)

      if(data.data.access_token) {
        Cookies.set('access_token', data.data?.access_token)
        Cookies.set('userId', data.data?.user?.userId)
      }

      console.log(data);

      router.push("/");
    } catch (error) {
      throw Error(error);
    } finally {
      isLoading.value = false
    }
  };

  return { form, signIn, isLoading };
}
