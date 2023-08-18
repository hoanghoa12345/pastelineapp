<template>
  <div class="my-12 flex justify-center">
    <Spinner v-if="isLoading" />
    <div v-if="result.status === 'success'" class="flex flex-col items-center">
      <CheckCircleIcon class="w-12 h-12 text-green-500" />
      <h1 class="text-2xl font-semibold">{{ result.message }}</h1>
    </div>
    <div v-if="result.status === 'error'" class="flex flex-col items-center">
      <XCircleIcon class="w-12 h-12 text-red-500" />
      <h1 class="text-2xl font-semibold">{{ result.message }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usersApi } from "@/api/users";
import Spinner from "@/components/spinner/Spinner.vue";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
const result = reactive({
  status: "",
  message: "",
});
const isLoading = ref(false);
const route = useRoute();
const { token } = route.query;

watchEffect(async () => {
  try {
    isLoading.value = true;
    if(token) {
      const { data } = await usersApi.verifyEmail(token.toString());
      console.log(data);      
    }
    result.status = "success";
    result.message = "Your email have been verified";
  } catch (error) {
    result.status = "error";
    result.message = "Error when verify email";
  } finally {
    isLoading.value = false;
  }
});
</script>
