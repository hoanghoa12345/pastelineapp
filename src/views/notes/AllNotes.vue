<template>
  <div class="mt-2">
    <h1 class="text-4xl py-4">All pages</h1>

    <p class="pb-4">
      <span class="font-base" v-if="filterResult"
        >Total {{ filterResult.length }} pages</span
      >
    </p>
    <div class="flex space-x-2 items-center">
      <button
        type="button"
        :disabled="notesStore.selectedNote.length === 0"
        @click="openConfirmModal"
        class="inline-flex space-x-4 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
      >
        <TrashIcon class="w-4 h-4 font-bold" />
        Delete
      </button>

      <form @submit.prevent="searchNote($event)">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <MagnifyingGlassIcon
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
            />
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search page names"
            v-model="searchQuery"
            required
          />
        </div>
      </form>
    </div>

    <Spinner v-if="isLoading" class="flex justify-center" />
    <div v-else class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  v-model="checkAll"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Page name</th>
            <th scope="col" class="px-6 py-3">Created At</th>
            <th scope="col" class="px-6 py-3">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="filterResult"
            v-for="note in filterResult"
            :key="note.noteId"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  :value="note.noteId"
                  v-model="notesStore.selectedNote"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <router-link :to="`/notes/${note.noteId}`">{{
                note.title
              }}</router-link>
            </th>
            <td class="px-6 py-4">
              {{ format(new Date(note.createdAt), "dd-MM-yyyy HH:ss") }}
            </td>
            <td class="px-6 py-4">
              {{ format(new Date(note.updatedAt), "dd-MM-yyyy HH:ss") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :open="isConfirm" @closeModal="isConfirm = false">
    <template #title>
      Are you sure you want to delete this page and its file?
    </template>
    <template #content>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs font-light text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-3 py-2">#</th>
            <th scope="col" class="px-3 py-2">Page name</th>
            <th scope="col" class="px-3 py-2">Created At</th>
            <th scope="col" class="px-3 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(note, index) in notesStore.getSelectedNote()"
            class="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <th
              scope="row"
              class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ note.title }}
            </th>
            <td class="px-3 py-2">
              {{ format(new Date(note.createdAt), "dd-MM-yyyy HH:ss") }}
            </td>
            <td class="px-3 py-2">
              {{ format(new Date(note.updatedAt), "dd-MM-yyyy HH:ss") }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #action>
      <div class="flex items-center space-x-2 justify-end">
        <button
          type="button"
          @click="isConfirm = false"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="deleteNotes"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Yes
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { sortBy } from "lodash-es";
import { format } from "date-fns";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import Spinner from "@/components/spinner/Spinner.vue";

const {
  getAll,
  notesStore,
  deleteNotes,
  searchNote,
  searchQuery,
  isConfirm,
  openConfirmModal,
} = useAllNotes();

// const { userStore } = useLogin();

// const locale = computed(() => userStore.user.locale);

const notes = computed(() =>
  sortBy(notesStore.notes, (obj) => {
    return format(new Date(obj.updatedAt), "yyyyMMdd");
  }).reverse()
);

const isLoading = computed(() => notesStore.isLoading);

// const searchResults = computed(() => notesStore.searchResults);

watchEffect(() => {
  getAll();
});

const checkAll = computed({
  get: () =>
    notes.value ? notesStore.selectedNote.length == notes.value.length : false,
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
</script>
