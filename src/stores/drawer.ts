// Handle toggle drawers

import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawerStore = defineStore("app-drawer", () => {
  const isOpen = ref(false);
  function setOpen(value: boolean) {
    isOpen.value = value;
  }

  return { isOpen, setOpen };
});
