<template>
    <div>
        <MilkdownProvider>
            <MilkdownEditor v-if="isLoaded" v-model="content" />
        </MilkdownProvider>
    </div>
</template>
<script setup lang="ts">
import { updateNoteApi, getNoteApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { MilkdownProvider } from "@milkdown/vue";
import { debounce } from 'lodash-es'

const route = useRoute()
const content = ref<string>("")
const isLoaded = ref<boolean>(false)

const noteId: string = route.params.noteId as string

const debouncedWatch = debounce(async () => {
    console.log('✅ Saved...');
    await updateNoteApi(noteId, content.value.split('\n')[0].replace('#', ''), content.value, getToken())
}, 2000);

watch(content, debouncedWatch);

onBeforeUnmount(() => {
  debouncedWatch.cancel();
})

watchEffect(async (onCleanup) => {
    const { data } = await getNoteApi(noteId, getToken())
    content.value = data.data.content
    isLoaded.value = true
    onCleanup(() => {
        isLoaded.value = false
    })
})
</script>