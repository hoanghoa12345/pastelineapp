<template>
    <div class="relative">
        <MilkdownProvider>
            <MilkdownEditor v-if="isLoaded" v-model="content" />
        </MilkdownProvider>
        <Menu>
            <MenuButton as="button" type="button"
                class="absolute top-0 right-0 p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <EllipsisHorizontalIcon class="w-6 h-6" />
            </MenuButton>
            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 top-6 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
                    <div class="py-1 text-gray-700 dark:text-gray-300">
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                            <button :class="[
                                active ? 'bg-gray-100 dark:bg-gray-600 dark:text-white' : 'dark:text-gray-400',
                                'group w-full rounded-lg text-left block py-2 px-4 text-sm',
                            ]" @click="addToFavorite(noteId)">
                                Add to Favorites
                            </button>
                            </MenuItem>
                        </div>
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                            <button :class="[
                                active ? 'bg-gray-100 dark:bg-gray-600 dark:text-white' : 'dark:text-gray-400',
                                'group w-full rounded-lg text-left block py-2 px-4 text-sm',
                            ]">
                                Delete page
                            </button>
                            </MenuItem>
                        </div>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
<script setup lang="ts">
import { updateNoteApi, getNoteApi } from "@/api/notes";
import { getToken } from "@/utils/helper";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
import { MilkdownProvider } from "@milkdown/vue";
import { debounce } from 'lodash-es'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const route = useRoute()
const { notesStore, addToRecent, setCurrentNote, addToFavorite } = useEditNote()
const currentNote = computed(() => notesStore.currentNote)
const content = ref<string>('')
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
    addToRecent(noteId)
    const { data } = await getNoteApi(noteId, getToken())
    content.value = data.data.content
    setCurrentNote(data.data)
    isLoaded.value = true
    onCleanup(() => {
        isLoaded.value = false
    })
})
</script>