import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("appState", () => {
  const openSearchBar = ref<boolean>(false);
  const openDrawer = ref<boolean>(true);
  const openCreate = ref<boolean>(false);

  function setOpenSearchBar(value: boolean) {
    openSearchBar.value = value;
  }

  function setOpenDrawer(value: boolean) {
    openDrawer.value = value;
  }

  function setOpenCreate(value: boolean) {
    openCreate.value = value;
  }

  return { openSearchBar, setOpenSearchBar, openDrawer, setOpenDrawer, openCreate, setOpenCreate };
});
