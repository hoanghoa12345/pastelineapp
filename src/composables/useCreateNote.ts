import { createNoteApi, updateNoteApi } from "@/api/notes";
import { debounce } from "lodash-es";
import removeMd from "remove-markdown";
import { getToken } from "@/utils/helper";

export function useCreateNote() {
  const content = ref<string>("# Untitled");
  const noteId = ref<string>(null);

  const debouncedWatch = debounce(async () => {
    if (noteId.value.length === 36) {
      await updateNoteApi(
        noteId.value,
        removeMd(content.value.split("\n")[0]),
        content.value,
        getToken()
      );
      console.log("✅ Saved...");
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
      const { data } = await createNoteApi(
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
