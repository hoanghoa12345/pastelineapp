<script setup lang="ts">
import { APP_NAME } from "@/utils/constants";
</script>

<template>
  <div class="mt-8">
    <h1
      class="py-2 text-2xl font-base text-center text-slate-900 dark:text-gray-100"
    >
      Welcome to {{ APP_NAME }}!
    </h1>

    <h3 class="text-md text-center dark:text-white">
      First you need to create pages to store your thoughts, ideas, notes.
    </h3>
  </div>
</template>

<style scoped></style>
