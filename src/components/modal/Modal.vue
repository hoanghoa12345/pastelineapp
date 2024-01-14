<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
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

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
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
              class="w-full max-w-3xl md:max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-dark-700 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle>
                <h3
                  class="my-2 text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  <slot name="title" />
                </h3>
                <button
                  type="button"
                  class="absolute top-2 right-2"
                  @click="closeModal"
                >
                  <XMarkIcon class="w-7 h-7 text-gray-500 dark:text-gray-300" />
                </button>
              </DialogTitle>
              <div class="mt-2">
                <slot name="content" />
              </div>

              <div class="mt-4">
                <slot name="action" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeModal"]);

function closeModal() {
  emit("closeModal");
}
</script>
