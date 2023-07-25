<template>
  <div class="createNote">
    <div
      id="editorjs"
      class="prose-sm md:prose-base lg:prose-base dark:prose-invert prose-neutral"
    />
  </div>
</template>

<script lang="ts" setup>
import EditorJS, { API } from "@editorjs/editorjs";
import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import CodeTool from "@editorjs/code";
const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["marker", "link"],
      config: {
        placeholder: "Header",
        levels: [1, 2, 3, 4],
        defaultLevel: 1,
      },
      shortcut: "CMD+SHIFT+H",
    },
    list: {
      class: NestedList,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+L",
    },
    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C",
    },
  },
  onReady: () => {
    console.log("onReady");
  },
  onChange: (api: API, event: BlockMutationEvent) => {
    if (event.type === "block-added") {
      handleSave();
    }
  },
});

const handleSave = () => {
  editor
    .save()
    .then((outputData) => {
      console.log("Article data: ", outputData);
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
};
</script>

<style lang="css">
.createNote {
  height: calc(100vh - 96px);
}

#editorjs {
  margin: 0 auto;
}
</style>
