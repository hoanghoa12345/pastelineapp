export function useAllNotes() {
  const notesStore = useNotesStore();

  const getAll = () => {
    notesStore.getAll();
  };

  const getById = (noteId: string) => {
    notesStore.getById(noteId);
  };

  const deleteNotes = () => {
    notesStore.deleteSelected();
  };

  return {
    notesStore,
    getAll,
    getById,
    deleteNotes,
  };
}
