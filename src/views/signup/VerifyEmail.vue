<template>
  <div class="w-screen h-screen bg-black bg-opacity-20">
    <Spinner v-if="isLoading" />
    <div
      v-else
      class="flex justify-center items-center w-full md:inset-0 md:h-full"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div
          class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-dark-800 sm:p-5"
        >
          <button
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
          <div
            class="w-12 h-12 rounded-full p-2 flex items-center justify-center mx-auto mb-3.5"
            :class="
              result.status === 'success'
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-red-100 dark:bg-red-900'
            "
          >
            <CheckIcon
              v-if="result.status === 'success'"
              class="w-8 h-8 text-green-500 dark:text-green-400"
            />
            <XMarkIcon
              v-if="result.status === 'error'"
              class="w-8 h-8 text-red-500 dark:text-red-400"
            />
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {{ result.message }}
          </p>
          <router-link
            to="/login"
            class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Continue
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from "@/components/spinner/Spinner.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";

const { isLoading, result } = useVerifyEmail();
</script>
