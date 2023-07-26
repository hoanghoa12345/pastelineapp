<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/preset-commonmark'

const markdown =
`# Start write something...
`

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, markdown)
    })
    .use(commonmark)
})
</script>

<template>
  <Milkdown class="prose lg:prose-xl dark:prose-invert vue-editor"/>
</template>
