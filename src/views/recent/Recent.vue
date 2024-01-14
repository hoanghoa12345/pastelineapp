<template>
  <div class="mt-2">
    <h1 class="px-4 text-4xl py-4 dark:text-white">Recent</h1>
    <p class="px-4 pb-4">
      <span class="font-base dark:text-white">Total {{ recentNotes.length }} pages</span>
    </p>
    <NoteList :notes="recentNotes" />
  </div>
</template>
<script setup lang="ts">
import NoteList from "@/components/notes-list/NotesList.vue";

const notes = useNotesStore();

const recentNotes = computed(() => (notes.notes ? notes.getRecentNotes() : []));
</script>
