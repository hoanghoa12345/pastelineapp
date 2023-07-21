<template>
  <div class="createNote">
    Create
    <!-- <Spinner /> -->
    <div id="editorjs" />
  </div>
</template>

<script lang="ts" setup>
import EditorJS from "@editorjs/editorjs";

const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: "editorjs",
  onReady: () => {
    console.log("onReady");
  },
  onChange: (api, event) => {
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
</style>
