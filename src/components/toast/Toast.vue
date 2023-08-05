<template>
  <transition
    appear
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="translate-y-6 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-400 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <div
      class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg border-b border-gray-200 dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        v-if="props.icon == 'success'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <CheckCircleIcon class="w-5 h-5" />
      </div>

      <div
        v-if="props.icon == 'error'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
      >
        <XCircleIcon class="w-5 h-5" />
      </div>

      <div
        v-if="props.icon == 'warning'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
      >
        <InformationCircleIcon class="w-5 h-5" />
      </div>

      <div
        v-if="props.icon == 'info'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-cyan-500 bg-cyan-100 rounded-lg dark:bg-cyan-700 dark:text-cyan-200"
      >
        <InformationCircleIcon class="w-5 h-5" />
      </div>

      <div class="ml-3 text-sm font-normal">
        {{ props.message }}
      </div>
      <button
        type="button"
        @click="emit('close')"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <XMarkIcon class="w-4 h-4" />
      </button>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  icon: {
    type: String,
    default: "success",
    validator: (val: string) =>
      ["success", "error", "warning", "info"].includes(val),
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  timeout: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<style>
.animation-toast-in {
  -webkit-animation: slide-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  animation: slide-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animation-toast-out {
  -webkit-animation: fade-out 0.2s ease-out both;
  animation: fade-out 0.2s ease-out both;
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes slide-top {
  0% {
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
