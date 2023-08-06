<template>
  <div>
    <MilkdownProvider>
      <MilkdownEditor v-model="content" />
    </MilkdownProvider>
  </div>
</template>

<script lang="ts" setup>
import { MilkdownProvider } from "@milkdown/vue";
const { content } = useCreateNote();
</script>
