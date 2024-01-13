import { sortBy } from "lodash-es";
import { format } from "date-fns";

export function useAllNotes() {
  const notesStore = useNotesStore();
  const searchQuery = ref<string>("");
  const isConfirm = ref<boolean>(false);
  const perPage = 10;
  const pageStart = 1;
  const pagination = reactive({
    start: pageStart,
    end: perPage,
  });

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
    get: () => (notes.value ? notesStore.selectedNote.length == notes.value.length : false),
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
      return notes.value.filter((note) => note.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1);
    }
    return [];
  });

  const currentPageData = computed(() => filterResult.value.slice(pagination.start, pagination.end));

  const updatePage = (value: number) => {
    pagination.start = (value - 1) * perPage;
    pagination.end = value * perPage;
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
    filterResult,
    checkAll,
    isLoading,
    currentPageData,
    updatePage,
    perPage,
    pageStart,
  };
}
