<template>
  <div
    v-if="toastStore.getToasts().length"
    class="fixed flex flex-col items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-transparent right-5 bottom-5 dark:text-gray-4 z-20"
    role="alert"
  >
    <Toast
      v-for="(toast, index) in toastStore.getToasts()"
      :key="index"
      :icon="toast.icon"
      :message="toast.message"
      :title="toast.title"
      @close="closeToast(toast.id)"
      :timeout="toast.timeout"
      :data-id="toast.id"
    />
  </div>
</template>

<script lang="ts" setup>
import { isNumber } from "lodash-es";

const toastStore = useToastStore();

const closeToast = (toastId: string) => {
  toastStore.removeToast(toastId);
};

watchEffect((onCleanup) => {
  toastStore.getToasts().forEach((toast) => {
    if (isNumber(toast.timeout) && toast.timeout > 0) {
      const timer = setTimeout(() => {
        closeToast(toast.id);
        clearTimeout(timer);
      }, toast.timeout);
    }
  });
  onCleanup(() => {});
});
</script>
