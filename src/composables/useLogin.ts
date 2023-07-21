export function useLogin() {
  const router = useRouter();

  const form = reactive({
    email: "",
    password: "",
  });

  const signIn = () => {
    try {
      console.log(form);
      router.push("/");
    } catch (error) {
      throw Error(error);
    }
  };

  return { form, signIn };
}
