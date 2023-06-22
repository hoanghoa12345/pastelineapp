<script setup lang="ts">
import {ref} from 'vue'
import Note from './Note.vue'

const notes = ref<string[]>([])

function saveNote (note:string) {
  notes.value.push(note)
}
</script>

<template>
   <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-medium mb-2">Your Notes</h2>
    <ul class="list-disc ml-4">
      <li v-for="(note, index) in notes" :key="index">{{note}}</li>
    </ul>
  <Note @note-saved="saveNote" />
</div>
</template>

<style scoped>
</style>
