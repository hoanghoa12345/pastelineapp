<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <router-link to="/login" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" :src="imgLogo" alt="logo" />
        {{ APP_NAME }}
      </router-link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
          <form class="space-y-4 md:space-y-6" @submit="signIn">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                v-bind="email"
                type="email"
                name="email"
                id="email"
                class="border sm:text-sm rounded-lg w-full p-2.5 block"
                placeholder="name@email.com"
                :class="
                  errors.email
                    ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-dark-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                " />
              <span class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                v-bind="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="border sm:text-sm rounded-lg block w-full p-2.5"
                :class="
                  errors.password
                    ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-dark-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                " />
              <span class="text-red-500 text-sm">{{ errors.password }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <Field v-slot="{ field }" name="remember" type="checkbox" :value="true">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-dark-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      v-bind="field"
                      :value="true" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </Field>
              </div>
              <router-link to="/forgot-password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</router-link
              >
            </div>
            <span class="text-red-500 text-sm">{{ errors.remember }}</span>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg
                v-if="isLoading"
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor" />
              </svg>
              Sign in
            </button>
            <button type="button" class="w-full text-blue-600 bg-white border border-primary-600 rounded-lg px-5 py-2 text-sm font-bold hover:opacity-80" @click="handleLoginSSO">
              <svg
                v-if="ssoLoading"
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-blue-600 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor" />
              </svg>
              
              Login with SSO</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don&#8217;t have an account yet?
              <router-link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { APP_NAME } from "@/utils/constants";
import { Field } from "vee-validate";
import imgLogo from '@/assets/logo.png'

const { email, password, signIn, userStore, errors, handleLoginSSO, ssoLoading } = useLogin();

const isLoading = computed(() => userStore.isLoading);
</script>

<style scoped></style>
