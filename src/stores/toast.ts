import { defineStore } from "pinia";

export const useToastStore = defineStore("toasts", () => {
  const toasts = ref([]);

  function sendToast(title: string, message: string, icon?: string) {
    toasts.value = [
      ...toasts.value,
      {
        title,
        message,
        icon,
      },
    ];
  }

  function getToasts() {
    return toasts.value;
  }

  function removeToast(index: number) {
    toasts.value.splice(index, 1);
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
