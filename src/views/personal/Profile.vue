<template>
  <div class="mt-2 mx-4">
    <h1 class="text-3xl md:text-4xl py-4 dark:text-white">Profile</h1>
    <div class="lg:max-w-6xl lg:mx-auto">
      <h3 class="font-semibold py-4 dark:text-white">General Information</h3>
      <img
        class="w-20 h-20 rounded-full"
        :src="userProfile.photoUrl"
        alt="user photo"
      />
      <form @submit="onSubmit">
        <div class="mb-4 mt-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="photoUrl"
            >Upload file</label
          >
          <input
            type="text"
            id="photoUrl"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="URL"
            v-bind="photoUrl"
          />
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name</label
            >
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              v-bind="name"
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              v-bind="email"
            />
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Locale</label
            >
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-bind="locale"
            >
              <option selected>Choose locale</option>
              <option value="en-US">United States</option>
              <option value="vi-VN">Vietnamese</option>
            </select>
          </div>
          <div>
            <label
              for="theme"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Select theme</label
            >
            <select
              id="theme"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-bind="theme"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <Field
              v-slot="{ field }"
              name="isAdmin"
              type="checkbox"
              :value="true"
            >
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isAdmin"
                  class="sr-only peer"
                  v-bind="field"
                  :value="true"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Administrator</span
                >
              </label>
            </Field>
          </div>
        </div>
        <div class="flex space-x-4">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <LoadingCircleIcon v-if="isLoading" />
            Update
          </button>
          <button
            type="button"
            class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-dark-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            @click="handleReset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Field } from "vee-validate";
import { useProfile } from "@/composables/useProfile";

const {
  userStore,
  isLoading,
  userProfile,
  onSubmit,
  handleReset,
  name,
  email,
  photoUrl,
  locale,
  theme,
} = useProfile();

const LoadingCircleIcon = defineComponent({
  name: "LoadingCircleIcon",
  render: () =>
    h(
      "svg",
      {
        ariaHidden: "true",
        role: "status",
        class: "inline w-4 h-4 mr-3 text-white animate-spin",
        viewBox: "0 0 100 101",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      [
        h("path", {
          d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
          fill: "#E5E7EB",
        }),
        h("path", {
          d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
          fill: "currentColor",
        }),
      ]
    ),
});
</script>
