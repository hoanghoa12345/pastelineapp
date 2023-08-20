<template>
  <div>
    <label
      :for="inputName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ props.label }}</label
    >
    <input
      :type="props.type"
      :name="inputName"
      :id="inputName"
      :placeholder="props.placeholder"
      class="border sm:text-sm rounded-lg block w-full p-2.5"
      :class="
        errors
          ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      "
      @input="emit('input', ($event.target as HTMLInputElement).value)"
      :value="value"
    />
    <span class="text-red-500 text-sm">{{ errors }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { snakeCase } from "lodash-es";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
  },
  errors: {
    type: [Object, String],
    required: false,
  },
});
const inputName = computed(() => {
  return snakeCase(props.label);
});
const emit = defineEmits<{
  (e: "input", value: string): void;
}>();
</script>
