<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/preset-commonmark'
import { listener, listenerCtx } from "@milkdown/plugin-listener";

import "@milkdown/theme-nord/style.css"

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, props.modelValue)
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        emit("update:modelValue", markdown);
      });
    })
    .use(commonmark)
    .use(listener)
})
</script>

<template>
  <Milkdown class="prose lg:prose-xl dark:prose-invert vue-editor"/>
</template>
