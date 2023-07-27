export function useAllNotes() {
    const notesStore = useNotesStore();

    const getAll = () => {
        notesStore.getAll()
    }

    const getById = (noteId: string) => {
        notesStore.getById(noteId)
    }

    return {
        notesStore, getAll, getById
    }
}