export function useAllNotes() {
  const notesStore = useNotesStore();
  const searchQuery = ref<string>("");
  const isConfirm = ref<boolean>(false);

  const getAll = () => {
    notesStore.getAll();
  };

  const getById = (noteId: string) => {
    notesStore.getById(noteId);
  };

  const deleteNotes = () => {
    isConfirm.value = false;
    notesStore.deleteSelected();
  };

  const searchNote = (e: Event) => {
    if (e.target instanceof HTMLFormElement) {
      const searchValue = e.target.elements["default-search"].value;
      notesStore.searchNote(searchValue);
    }
  };

  const openConfirmModal = () => {
    isConfirm.value = true;
  };

  return {
    notesStore,
    getAll,
    getById,
    deleteNotes,
    searchNote,
    searchQuery,
    isConfirm,
    openConfirmModal,
  };
}
