import { noteApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { Note } from "@/utils/types";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>(null);
  const currentNote = ref(null);
  const isLoading = ref(false);
  const selectedNote = ref<string[]>([]);
  const recentNotes = ref<string[]>([]);
  const favoriteNotes = ref<string[]>([]);
  const searchResults = ref<Note[]>([]);
  async function getAll() {
    try {
      isLoading.value = true;
      const token = getToken();
      const { data } = await noteApi.get(token);
      notes.value = data.data;
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.BOTTOM_RIGHT });
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
        toast.success("Delete page success", { position: toast.POSITION.BOTTOM_RIGHT });
      } catch (error) {
        toast.error("Error when delete page", { position: toast.POSITION.BOTTOM_RIGHT });
        throw Error(error);
      }
    });
  }

  function getSelectedNote() {
    return notes.value.filter((note) => selectedNote.value.includes(note.noteId));
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
    noteApi.favorite(noteId, getToken());
    favoriteNotes.value = [...favoriteNotes.value, noteId];
  }

  function getFavoriteNotes() {
    return notes.value.filter((obj) => favoriteNotes.value.includes(obj.noteId));
  }

  async function deleteNoteById(noteId: string) {
    try {
      await noteApi.delete(noteId, getToken());
      toast.success("Delete page success", { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      toast.error("Delete page error", { position: toast.POSITION.BOTTOM_RIGHT });
      throw Error(error);
    }
  }

  function searchNote(search: string) {
    searchResults.value = notes.value.filter((note) => note.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
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
  };
});
