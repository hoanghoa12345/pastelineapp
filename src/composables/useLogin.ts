export function useLogin() {
  const userStore = useUserStore();

  const form = reactive({
    email: "",
    password: "",
  });

  const signIn = () => {
    userStore.login(form);
  };

  const signOut = () => {
    userStore.logout();
  };

  const getProfile = () => {
    userStore.getProfile();
  };

  return {
    form,
    signIn,
    signOut,
    getProfile,
    userStore,
  };
}
