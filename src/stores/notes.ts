import { noteApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { Note } from "@/utils/types";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>(null);
  const currentNote = ref(null);
  const isLoading = ref(false);
  const selectedNote = ref<string[]>([]);
  const recentNotes = ref<string[]>([]);
  const favoriteNotes = ref<string[]>([]);
  const searchResults = ref<Note[]>([]);
  const syncNoteState = ref<"sync" | "saved">("saved");
  const toastStore = useToastStore();
  async function getAll() {
    try {
      isLoading.value = true;
      const token = getToken();
      const { data } = await noteApi.get(token);
      notes.value = data.data;
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
      const { data } = await noteApi.getById(noteId, token);
      currentNote.value = data.data;
    } catch (error) {
      throw Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteSelected() {
    const token = getToken();
    selectedNote.value.forEach(async (noteId) => {
      try {
        await noteApi.delete(noteId, token);
        toastStore.sendToast("", "Delete page success", "success", 2500);
      } catch (error) {
        toastStore.sendToast("", "Delete page error", "error", 2500);
        throw Error(error);
      }
    });
  }

  function getSelectedNote() {
    return notes.value.filter((note) =>
      selectedNote.value.includes(note.noteId)
    );
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

  function setSyncNoteState(state: "sync" | "saved") {
    syncNoteState.value = state;
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
    getSelectedNote,
    syncNoteState,
    setSyncNoteState,
  };
});
