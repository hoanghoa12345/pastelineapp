<script setup lang="ts">
import { APP_NAME } from "@/utils/constants";
</script>

<template>
  <div>
    <h1
      class="py-2 text-3xl font-base text-center text-slate-900 dark:text-slate-500"
    >
      Welcome to {{ APP_NAME }}!
    </h1>

    <h3 class="text-xl text-center">
      First you need to create pages to store your thoughts, ideas, notes.
    </h3>
  </div>
</template>

<style scoped></style>
