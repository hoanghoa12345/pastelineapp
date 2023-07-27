<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, editorViewCtx, parserCtx, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/preset-commonmark'
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { Slice } from "prosemirror-model";

import "@milkdown/theme-nord/style.css"
import { Ctx } from '@milkdown/ctx';
import { onUpdated, nextTick, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx: Ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, props.modelValue)
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        emit("update:modelValue", markdown);
      });
    })
    .use(commonmark)
    .use(listener)
})

// watchEffect(() => {
//   let editor = get()
//   editor?.action((ctx: Ctx) => {
//     const view = ctx.get(editorViewCtx);
//     const parser = ctx.get(parserCtx);
//     const doc = parser(props.modelValue);
//     if (!doc) return;
//     const state = view.state;
//     view.dispatch(
//       state.tr.replace(
//         0,
//         state.doc.content.size,
//         new Slice(doc.content, 0, 0)
//       )
//     );
//   })
// })
</script>

<template>
  <Milkdown class="prose lg:prose-xl dark:prose-invert vue-editor" />
</template>
