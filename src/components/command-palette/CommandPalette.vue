<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto p-4 pt-32">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full mx-auto max-w-xl transform rounded-xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all"
          >
            <Combobox v-model="selected">
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                >
                  <ComboboxInput
                    class="w-full border-none outline-none py-3 pl-10 pr-3 text-sm leading-5 text-gray-900 focus:ring-0 dark:bg-slate-700 dark:text-gray-200"
                    @change="query = $event.target.value"
                    placeholder="Search..."
                  />
                  <ComboboxButton
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
                    <MagnifyingGlassIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </ComboboxButton>
                </div>
                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="query = ''"
                >
                  <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div
                      v-if="filteredNotes.length === 0 && query !== ''"
                      class="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      Nothing found.
                    </div>

                    <ComboboxOption
                      v-for="note in filteredNotes"
                      as="template"
                      :key="note.noteId"
                      :value="note"
                      v-slot="{ selected, active }"
                      @click="openNote(note.noteId)"
                    >
                      <li
                        class="relative cursor-default select-none py-2 pl-10 pr-4 text-sm"
                        :class="{
                          'bg-blue-600 text-white': active,
                          'text-gray-900 dark:text-gray-300': !active,
                        }"
                      >
                        <span
                          class="block truncate"
                          :class="{
                            'font-medium': selected,
                            'font-normal': !selected,
                          }"
                        >
                          {{ note.title }}
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
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

const router = useRouter();

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const notesStore = useNotesStore();

const notes = computed(() => notesStore.notes);

let selected = ref();
let query = ref();

let filteredNotes = computed(() =>
  query.value === ""
    ? notes.value
    : notes.value.filter((note) =>
        note.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

function openNote(nodeId: string) {
  emit("close");
  router.push("/notes/" + nodeId);
}
</script>
