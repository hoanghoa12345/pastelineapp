<template>
  <component :is="as" :to="to" class="group flex items-center space-x-3 px-6 py-2.5 dark:text-white hover:bg-[#ebebeb] dark:hover:bg-gray-500 rounded-md">
    <Icon class="group-hover:text-[#808080] dark:group-hover:text-gray-200" :icon="icon" />
    <span class="text-sm">{{ name }}</span>
  </component>
</template>

<script lang="ts">
export default {
  name: "SidebarItem"
}
</script>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
defineProps({
  as: {
    type: Object as PropType<Component>,
    required: false ,
    default: RouterLink
  },
  to: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
</script>
