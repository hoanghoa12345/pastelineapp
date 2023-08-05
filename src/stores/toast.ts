import { uniqueId, remove } from "lodash-es";
import { defineStore } from "pinia";

interface Toast {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timeout?: number;
}

export const useToastStore = defineStore("toasts", () => {
  const toasts = ref<Toast[]>([]);

  function sendToast(
    title: string,
    message: string,
    icon?: string,
    timeout?: number
  ) {
    toasts.value = [
      ...toasts.value,
      {
        id: uniqueId(),
        title,
        message,
        icon,
        timeout,
      },
    ];
  }

  function getToasts() {
    return toasts.value;
  }

  function removeToast(toastId: string) {
    remove(toasts.value, (t) => t.id === toastId);
  }

  function clearToasts() {
    toasts.value = [];
  }

  return {
    toasts,
    sendToast,
    getToasts,
    removeToast,
    clearToasts,
  };
});
