<template>
  <div class="mt-2">
    <h1 class="text-4xl py-4">All pages</h1>

    <p class="pb-4">
      <span class="font-base" v-if="notes">Total {{ notes.length }} pages</span>
    </p>
    <div class="flex space-x-2 items-center">
      <button type="button" :disabled="notesStore.selectedNote.length === 0" @click="deleteNotes"
        class="inline-flex space-x-4 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed">
        <TrashIcon class="w-4 h-4 font-bold" />
        Delete
      </button>

      <form @submit.prevent="searchNote($event)">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input type="search" id="default-search"
            class="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search page names" required />
        </div>
      </form>
    </div>

    <div class="relative overflow-x-auto">
      <Spinner v-if="isLoading" />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" v-model="checkAll"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Page name</th>
            <th scope="col" class="px-6 py-3">Created At</th>
            <th scope="col" class="px-6 py-3">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in notes"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input type="checkbox" :value="note.noteId" v-model="notesStore.selectedNote"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <router-link :to="`/notes/${note.noteId}`">{{ note.title }}</router-link>
            </th>
            <td class="px-6 py-4">{{ new Date(note.createdAt).toLocaleString(locale) }}</td>
            <td class="px-6 py-4">{{ new Date(note.updatedAt).toLocaleString(locale) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <Spinner /> -->
  </div>
</template>

<script lang="ts" setup>
import Spinner from "@/components/spinner/Spinner.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const { getAll, notesStore, deleteNotes, searchNote } = useAllNotes()

const { userStore } = useLogin()

const locale = computed(() => userStore.user.locale)

const notes = computed(() => notesStore.notes)

const isLoading = computed(() => notesStore.isLoading)

watchEffect(() => {
  getAll()
})

const checkAll = computed({
  get: () => notes.value ? notesStore.selectedNote.length == notes.value.length : false,
  set: (val) => {
    let checked = []
    if (val) {
      notes.value.forEach(item => {
        checked.push(item.noteId)
      });
    }
    notesStore.selectedNote = checked
  }
})
</script>
