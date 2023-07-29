export function useAllNotes() {
  const notesStore = useNotesStore();
  const searchQuery = ref<string>("");

  const getAll = () => {
    notesStore.getAll();
  };

  const getById = (noteId: string) => {
    notesStore.getById(noteId);
  };

  const deleteNotes = () => {
    notesStore.deleteSelected();
  };

  const searchNote = (e: Event) => {
    if (e.target instanceof HTMLFormElement) {
      const searchValue = e.target.elements["default-search"].value;
      notesStore.searchNote(searchValue);
    }
  };

  return {
    notesStore,
    getAll,
    getById,
    deleteNotes,
    searchNote,
    searchQuery,
  };
}
