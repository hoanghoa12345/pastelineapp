<template>
  <div>
    <MilkdownProvider>
      <MilkdownEditor v-model="content" />
    </MilkdownProvider>
  </div>
</template>

<script lang="ts" setup>
import { MilkdownProvider } from "@milkdown/vue";

const content = ref<string>("# New note...")

watch(content, (oldValue, newValue) => {
  if (oldValue !== newValue) {
    console.log(newValue);
  }
})

// watchEffect(async (onCleanup) => {
//   const interval = setInterval(() => {
//     console.log(content.value);
//   }, 4000)
//   onCleanup(() => {
//     clearInterval(interval)
//   })
// })
</script>
