<script setup lang="ts">
import {ref} from 'vue'
const emit = defineEmits(['note-saved'])
const note = ref<string>('')
function saveNote () {
  emit('note-saved', note.value)
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <textarea class="w-full h-32 bg-gray-100 px-2 py-1 rounded-md resize-none" v-model="note"></textarea>
    <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" @click="saveNote">Save</button>
  </div>
</template>

<style scoped></style>
