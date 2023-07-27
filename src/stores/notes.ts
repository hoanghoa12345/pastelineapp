import { getNoteApi, getNotesApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { isArray } from "@vue/shared";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref(null);
  const currentNote = ref(null);
  const isLoading = ref(false);
  const selectedNote = ref<string[]>([]);
  async function getAll() {
    try {
      isLoading.value = true;
      const token = getToken();
      const { data } = await getNotesApi(token);

      if (isArray(data.data)) {
        notes.value = data.data.sort((a, b) => a.updatedAt - b.updatedAt);
      } else {
        notes.value = data.data;
      }
    } catch (error) {
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function getById(noteId: string) {
    try {
      isLoading.value = true;
      const token = getToken();
      const { data } = await getNoteApi(noteId, token);
      currentNote.value = data.data;
    } catch (error) {
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  function deleteSelected() {
    console.log("deleted!");
  }

  return {
    notes,
    currentNote,
    getAll,
    getById,
    isLoading,
    selectedNote,
    deleteSelected,
  };
});
