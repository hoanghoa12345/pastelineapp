import { getToken } from "@/utils/helper";
import { debounce } from "lodash-es";
import removeMd from "remove-markdown";
import { noteApi } from "@/api/notes";
import SpinnerVue from "@/components/spinner/Spinner.vue";
import MilkdownEditorVue from "@/components/editor/MilkdownEditor.vue";
import NotFoundVue from "@/views/not-found/NotFound.vue";

export function useEditNote() {
  const route = useRoute();
  const notesStore = useNotesStore();

  const currentNote = computed(() => notesStore.currentNote);
  const content = ref<string>("");
  const isInitialValueSet = ref<boolean>(false);

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

  const deleteNote = (noteId: string) => {
    notesStore.deleteNoteById(noteId);
  };

  const debouncedWatch = debounce(async () => {
    if (isInitialValueSet.value) {
      notesStore.setSyncNoteState("sync");
      await noteApi.update(
        noteId,
        removeMd(content.value.split("\n")[0]),
        content.value,
        getToken()
      );
      notesStore.setSyncNoteState("saved");
    } else {
      isInitialValueSet.value = true;
    }
  }, 2000);

  watch(content, debouncedWatch);

  onBeforeUnmount(() => {
    debouncedWatch.cancel();
  });

  const VueEditor = defineAsyncComponent({
    loader: async () => {
      try {
        addToRecent(noteId);
        const { data } = await noteApi.getById(noteId, getToken());
        content.value = data.data.content;
        setCurrentNote(data.data);
        return MilkdownEditorVue;
      } catch (err) {
        return NotFoundVue;
      }
    },
    loadingComponent: SpinnerVue,
    errorComponent: NotFoundVue,
    timeout: 3000,
  });

  return {
    notesStore,
    noteId,
    content,
    currentNote,
    addToRecent,
    getNoteById,
    setCurrentNote,
    addToFavorite,
    getFavoriteNotes,
    deleteNote,
    VueEditor,
  };
}
