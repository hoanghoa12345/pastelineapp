<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-20">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-slate-900 bg-opacity-40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto p-4 pt-32">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95">
          <DialogPanel
            class="w-full mx-auto max-w-xl transform rounded-xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
            <div class="bg-white dark:bg-gray-700 rounded-md min-h-[14rem] max-h-[32rem] overflow-hidden">
              <Combobox v-model="selected">
                <div class="">
                  <div
                    class="flex flex-row-reverse w-full text-left border-b rounded-t-md overflow-hidden border-gray-200 dark:border-gray-600 focus:outline-none sm:text-sm font-light">
                    <ComboboxInput
                      class="w-full border-none outline-none py-3 px-3 text-sm leading-5 text-gray-900 focus:ring-0 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                      @change="query = $event.target.value" placeholder="Search any thing" />
                    <ComboboxButton class="inset-y-0 py-4 pl-4">
                      <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>
                  </div>
                  <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                    @after-leave="query = ''">
                    <ComboboxOptions v-if="filteredNotes" class="max-h-[20rem] w-full overflow-auto py-4 text-base"
                      :hold="true">
                      <div v-if="filteredNotes.length === 0 && query !== ''"
                        class="select-none py-2 px-4 text-gray-700 dark:text-gray-300 text-sm">
                        Nothing found
                      </div>

                      <ComboboxOption v-else v-for="note in filteredNotes" as="template" :key="note.noteId" :value="note"
                        v-slot="{ selected, active }" @click="openNote(note.noteId)">
                        <li class="cursor-pointer py-4 px-4 mb-2 mx-2 rounded-md text-sm" :class="{
                          'bg-blue-600 text-white dark:bg-blue-400': active,
                          'text-gray-800 bg-gray-50 dark:text-gray-300 dark:bg-slate-600 ': !active,
                        }">
                          <span class="block truncate" :class="{
                            'font-medium': selected,
                            'font-normal': !selected,
                          }">
                            {{ note.title }}
                          </span>
                        </li>
                      </ComboboxOption>
                    </ComboboxOptions>
                  </TransitionRoot>
                </div>
              </Combobox>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import { Note } from "@/utils/types";

const router = useRouter();

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const notesStore = useNotesStore();

const notes = computed(() => notesStore.notes);

let selected = ref<Note>();
let query = ref<string>();

let filteredNotes = computed(() => {
  if (notes.value === null) return;
  return query.value === ""
    ? notes.value
    : notes.value.filter((note) =>
      note.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.value.toLowerCase().replace(/\s+/g, ""))
    )
}

);

watch(selected, (value) => {
  openNote(value.noteId)
})

function openNote(nodeId: string) {
  emit("close");
  router.push("/notes/" + nodeId);
}

onMounted(() => {
  if (notes.value === null) {
    notesStore.getAll();
  }
})
</script>
