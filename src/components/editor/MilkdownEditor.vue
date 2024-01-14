<script setup lang="ts">
import { Milkdown, useEditor } from "@milkdown/vue";
import { Ctx } from "@milkdown/ctx";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";

import { commonmark } from "@milkdown/preset-commonmark";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { slashFactory } from "@milkdown/plugin-slash";
import { prism, prismConfig } from "@milkdown/plugin-prism";
import { indent } from "@milkdown/plugin-indent";
import { history } from "@milkdown/plugin-history";
import { trailing } from "@milkdown/plugin-trailing";
import { clipboard } from "@milkdown/plugin-clipboard";
// import { block } from "@milkdown/plugin-block";

// import { usePluginViewFactory } from "@prosemirror-adapter/vue";

import { pastel } from "./theme";
// import Slash from "./Slash.vue";
// import Block from "./Block.vue";

import { refractor } from "refractor/lib/all";
import "prismjs/themes/prism-funky.css";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// const tooltip = slashFactory("Commands");
// const pluginViewFactory = usePluginViewFactory();

useEditor((root) => {
  return Editor.make()
    .config(pastel)
    .config((ctx: Ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, props.modelValue);
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        emit("update:modelValue", markdown);
      });
      ctx.set(prismConfig.key, {
        configureRefractor: () => refractor,
      });
      // ctx.set(block.key, {
      //   view: pluginViewFactory({
      //     component: Block,
      //   }),
      // });
      // ctx.set(tooltip.key, {
      //   view: pluginViewFactory({
      //     component: Slash,
      //   }),
      // });
    })
    .use(commonmark)
    .use(listener)
    .use(prism)
    .use(indent)
    .use(history)
    .use(trailing)
    .use(clipboard)
    // .use(block)
    // .use(tooltip);
});
</script>

<template>
  <Milkdown class="prose lg:prose-xl dark:prose-invert vue-editor" />
</template>
