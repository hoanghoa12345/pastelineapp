<template>
  <div
    v-if="toastStore.getToasts().length > 0"
    id="toast-bottom-right"
    class="fixed flex flex-col items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert"
  >
    <Toast
      v-for="(toast, index) in toastStore.getToasts()"
      :key="index"
      :message="toast.message"
      :title="toast.title"
      @close="closeToast(index)"
      :timeout="1500 * (index + 1)"
    />
  </div>
</template>

<script lang="ts" setup>
const toastStore = useToastStore();

const closeToast = (index: number) => {
  toastStore.removeToast(index);
};
</script>
