import { getNoteApi, getNotesApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { isArray } from "@vue/shared";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref(null);
  const currentNote = ref(null);
  const isLoading = ref(false);
  const selectedNote = ref<string[]>([]);
  const recentNotes = ref<string[]>([]);
  const favoriteNotes = ref<string[]>([]);
  const searchResults = ref<string[]>([]);
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

  function addToRecent(noteId: string) {
    recentNotes.value = [...recentNotes.value, noteId];
  }

  function getRecentNotes() {
    return notes.value.filter((obj) => recentNotes.value.includes(obj.noteId));
  }

  function setCurrentNote(note: unknown) {
    currentNote.value = note;
  }

  function addToFavorite(noteId: string) {
    favoriteNotes.value = [...favoriteNotes.value, noteId];
  }

  function getFavoriteNotes() {
    return notes.value.filter((obj) =>
      favoriteNotes.value.includes(obj.noteId)
    );
  }

  async function deleteNoteById(noteId: string) {}

  function searchNote(search: string) {
    searchResults.value = notes.value.filter(
      (note) => note.title.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    console.log(searchResults.value);
  }
  return {
    notes,
    currentNote,
    getAll,
    getById,
    isLoading,
    selectedNote,
    deleteSelected,
    addToRecent,
    getRecentNotes,
    setCurrentNote,
    addToFavorite,
    getFavoriteNotes,
    deleteNoteById,
    searchNote,
    searchResults,
  };
});
