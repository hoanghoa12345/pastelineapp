import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export function useSignUp() {
  const userStore = useUserStore();

  const schema = toTypedSchema(
    yup.object({
      email: yup.string().email().required().label("Email"),
      password: yup.string().min(6).required().label("Password"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password doesn't match")
        .required()
        .label("Confirm password"),
      acceptTerms: yup.boolean().oneOf([true]).label("Accept terms"),
    })
  );

  const { defineInputBinds, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const email = defineInputBinds("email");
  const password = defineInputBinds("password");
  const confirmPassword = defineInputBinds("confirmPassword");
  const acceptTerms = defineInputBinds("acceptTerms");

  const signUp = handleSubmit((values) => {
    console.log(values);
  });

  return {
    email,
    password,
    confirmPassword,
    acceptTerms,
    signUp,
    userStore,
    errors,
    schema,
  };
}
