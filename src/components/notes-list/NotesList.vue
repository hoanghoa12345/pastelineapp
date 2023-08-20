<template>
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
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">Page name</th>
        <th scope="col" class="px-6 py-3">Created At</th>
        <th scope="col" class="px-6 py-3">Updated At</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="props.notes"
        v-for="note in notes"
        :key="note.noteId"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td class="w-4 p-4">
          <div class="flex items-center justify-center">
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
          class="px-6 py-4 font-medium text-gray-900 dark:text-white"
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
  <div v-if="props.notes?.length === 0" class="flex justify-center">
    <span class="px-6 py-4 font-medium text-gray-900 dark:text-white">
      There are no notes in here
    </span>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { Note } from "@/utils/types";

const props = defineProps<{
  notes: Note[];
}>();

const notesStore = useNotesStore();

const checkAll = computed({
  get: () =>
    props.notes ? notesStore.selectedNote.length == props.notes.length : false,
  set: (val) => {
    let checked = [];
    if (val) {
      props.notes.forEach((item) => {
        checked.push(item.noteId);
      });
    }
    notesStore.selectedNote = checked;
  },
});
</script>

<style scoped></style>
