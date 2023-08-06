import { getToken } from "@/utils/helper";
import { debounce } from "lodash-es";
import removeMd from "remove-markdown";
import { updateNoteApi, getNoteApi } from "@/api/notes";

export function useEditNote() {
  const route = useRoute();
  const notesStore = useNotesStore();

  const currentNote = computed(() => notesStore.currentNote);
  const content = ref<string>("");
  const isLoaded = ref<boolean>(false);

  const noteId: string = route.params.noteId as string;

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

  const debouncedWatch = debounce(async () => {
    console.log("✅ Saved...");
    await updateNoteApi(
      noteId,
      removeMd(content.value.split("\n")[0]),
      content.value,
      getToken()
    );
  }, 2000);

  watch(content, debouncedWatch);

  onBeforeUnmount(() => {
    debouncedWatch.cancel();
  });

  watchEffect(async (onCleanup) => {
    addToRecent(noteId);
    const { data } = await getNoteApi(noteId, getToken());
    content.value = data.data.content;
    setCurrentNote(data.data);
    isLoaded.value = true;
    onCleanup(() => {
      isLoaded.value = false;
    });
  });

  return {
    notesStore,
    noteId,
    isLoaded,
    content,
    currentNote,
    addToRecent,
    getNoteById,
    setCurrentNote,
    addToFavorite,
    getFavoriteNotes,
  };
}
