<template>
  <div class="mt-2">
    <h1 class="text-4xl py-4">Collections</h1>
    <p class="pb-4">
      <span class="font-base">Total {{ notes.length }} pages</span>
    </p>
    <select
      v-model="selected"
      class="bg-gray-50 w-32 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="favorite" selected>Favorites</option>
      <option value="pinned">Pinned</option>
      <option value="deleted">Deleted</option>
    </select>
    <Spinner v-if="isLoading" />
    <NoteList v-else :notes="notes" />
  </div>
</template>

<script lang="ts" setup>
import { noteApi } from "@/api/notes";
import NoteList from "@/components/notes-list/NotesList.vue";
import Spinner from "@/components/spinner/Spinner.vue";
import { getToken } from "@/utils/helper";

const notes = ref([]);
const isLoading = ref(false);
const selected = ref("favorite");

async function getNote(selected: string) {
  try {
    isLoading.value = true;
    const { data } = await noteApi.get(getToken(), { [`${selected}`]: true });
    notes.value = data?.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

watch(selected, async (value) => {
  await getNote(value);
});

watchEffect(async () => {
  await getNote(selected.value);
});
</script>
