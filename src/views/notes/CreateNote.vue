<template>
  <div>
    <MilkdownProvider>
      <MilkdownEditor v-model="content" />
    </MilkdownProvider>
  </div>
</template>

<script lang="ts" setup>
import { createNoteApi,updateNoteApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { MilkdownProvider } from "@milkdown/vue";
import { debounce } from 'lodash-es'

const content = ref<string>("# Untitled")
const noteId = ref<string>(null)

const debouncedWatch = debounce(async () => {
  if(noteId.value.length === 36) {
    await updateNoteApi(noteId.value, content.value.split('\n')[0].replace('#', ''), content.value, getToken())
    console.log('✅ Saved...');
  }
}, 2000);

watch(content, debouncedWatch);

onBeforeUnmount(() => {
  debouncedWatch.cancel();
})

watchEffect(async () => {
  const newNoteId = localStorage.getItem('newNoteId')
  if(newNoteId && newNoteId.length === 36) {
    localStorage.setItem('newNoteId', newNoteId)
  }else {
    const {data} = await createNoteApi(content.value.split('\n')[0].replace('#', ''), content.value, getToken());
    noteId.value = data.data.noteId
    localStorage.setItem('newNoteId', data.data.noteId)
  }
})
</script>
