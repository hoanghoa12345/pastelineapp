import * as pagination from "@zag-js/pagination";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { sortBy } from "lodash-es";
import { format } from "date-fns";

export function useAllNotes() {
  const notesStore = useNotesStore();
  const searchQuery = ref<string>("");
  const isConfirm = ref<boolean>(false);
  const [state, send] = useMachine(
    pagination.machine({
      id: "1",
      count: 0,
      type: "link",
    })
  );

  const api = computed(() =>
    pagination.connect(state.value, send, normalizeProps)
  );

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

  const notes = computed(() =>
    sortBy(notesStore.notes, (obj) => {
      return format(new Date(obj.updatedAt), "yyyyMMdd");
    }).reverse()
  );

  const isLoading = computed(() => notesStore.isLoading);

  watchEffect(() => {
    getAll();
  });

  const checkAll = computed({
    get: () =>
      notes.value
        ? notesStore.selectedNote.length == notes.value.length
        : false,
    set: (val) => {
      let checked = [];
      if (val) {
        notes.value.forEach((item) => {
          checked.push(item.noteId);
        });
      }
      notesStore.selectedNote = checked;
    },
  });

  const filterResult = computed(() => {
    if (notes.value instanceof Array) {
      return notes.value.filter(
        (note) =>
          note.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
      );
    }
    return [];
  });

  watch(filterResult, (value) => {
    api.value.setCount(value.length);
  });

  const currentPageData = computed(() =>
    filterResult.value.slice(api.value.pageRange.start, api.value.pageRange.end)
  );

  return {
    notesStore,
    getAll,
    getById,
    deleteNotes,
    searchNote,
    searchQuery,
    isConfirm,
    openConfirmModal,
    filterResult,
    checkAll,
    isLoading,
    api,
    currentPageData,
  };
}
