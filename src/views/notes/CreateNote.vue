<template>
  <div>
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  </div>
</template>

<script lang="ts" setup>
import { MilkdownProvider } from "@milkdown/vue";
import "@milkdown/theme-nord/style.css"
</script>
