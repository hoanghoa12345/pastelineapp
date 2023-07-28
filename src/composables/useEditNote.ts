export function useEditNote() {
  const notesStore = useNotesStore();

  const addToRecent = (noteId: string) => {
    notesStore.addToRecent(noteId);
  };

  const getNoteById = (noteId: string) => {
    notesStore.getById(noteId);
  };

  const setCurrentNote = (note: unknown) => {
    notesStore.setCurrentNote(note);
  };

  const addToFavorite = (noteId: string) => {
    notesStore.addToFavorite(noteId);
  };

  const getFavoriteNotes = () => {
    notesStore.getFavoriteNotes();
  };

  return {
    notesStore,
    addToRecent,
    getNoteById,
    setCurrentNote,
    addToFavorite,
    getFavoriteNotes,
  };
}
