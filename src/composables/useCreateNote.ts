import { noteApi } from "@/api/notes";
import { debounce } from "lodash-es";
import removeMd from "remove-markdown";
import { getToken } from "@/utils/helper";

export function useCreateNote() {
  const route = useRoute();
  const { title } = route.query;
  const content = ref<string>("# " + title.toString() || "Untitled");
  const noteId = ref<string>(null);
  const notesStore = useNotesStore();

  const debouncedWatch = debounce(async () => {
    if (noteId.value.length === 36) {
      notesStore.setSyncNoteState("sync");
      await noteApi.update(
        noteId.value,
        removeMd(content.value.split("\n")[0]),
        content.value,
        getToken()
      );
      notesStore.setSyncNoteState("saved");
    }
  }, 2000);

  watch(content, debouncedWatch);

  onBeforeUnmount(() => {
    debouncedWatch.cancel();
  });

  watchEffect(async () => {
    const newNoteId = localStorage.getItem("newNoteId");
    if (newNoteId && newNoteId.length === 36) {
      localStorage.setItem("newNoteId", newNoteId);
    } else {
      const { data } = await noteApi.create(
        removeMd(content.value.split("\n")[0]),
        content.value,
        getToken()
      );
      noteId.value = data.data.noteId;
      localStorage.setItem("newNoteId", data.data.noteId);
    }
  });
  return {
    content,
    noteId,
  };
}
