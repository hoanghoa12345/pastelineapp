<script setup lang="ts">
import { Sidebar } from "@/modules/sidebar/types";

const leftSidebarData: Sidebar[] = [
  {
    categoryList: [
      {
        name: "Inbox",
        link: "inbox",
        icon: "layers-outline",
        total: "0",
      },
      {
        name: "Note",
        link: "note",
        icon: "document-outline",
        total: "0",
      },
      {
        name: "Links",
        link: "link",
        icon: "link-outline",
        total: "0",
      },
      {
        name: "Youtube",
        link: "youtube",
        icon: "play-circle-outline",
        total: "30",
      },
    ],
    folderList: [
      {
        name: "Unity",
        link: "unity",
        total: "0",
      },
      {
        name: "Test folder",
        link: "test-folder",
        total: "0",
      },
    ],
  },
];
</script>

<template>
  <div
    class="flex flex-col justify-between md:flex md:w-[12rem] lg:w-[24rem] max-w-[400px] h-screen shadow-sm bg-[#2A2A2A]"
  >
    <div>
      <div class="px-2 py-2 text-gray-50" v-for="listItem in leftSidebarData">
        <ul class="pb-8">
          <li
            class="px-2 py-1 flex items-center justify-between hover:bg-[#373737] hover:rounded-md space-x-1"
            v-for="category in listItem.categoryList"
          >
            <div class="flex items-center space-x-1">
              <ion-icon
                :name="category.icon"
                class="text-lg text-[#949494]"
              ></ion-icon>
              <span class="text-xs md:text-sm">{{ category.name }}</span>
            </div>
            <span class="text-xs text-[#949494]">{{ category.total }}</span>
          </li>
        </ul>
        <h3 class="px-2 text-xs text-[#8C8C8C] font-semibold py-2 uppercase">
          Folders
        </h3>
        <ul>
          <li
            class="px-2 py-1 flex items-center justify-between text-xs hover:bg-[#373737] hover:rounded-md"
            v-for="folder in listItem.folderList"
          >
            <div class="flex items-center space-x-1">
              <ion-icon
                name="folder-open-outline"
                class="text-lg text-[#949494]"
              ></ion-icon>
              <span class="text-xs md:text-sm">{{ folder.name }}</span>
            </div>
            <span class="text-xs text-[#949494]">{{ folder.total }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="px-4 py-2 text-gray-50 flex justify-between items-center">
      <div class="flex items-center space-x-1">
        <ion-icon
          class="text-lg text-[#949494]"
          name="add-circle-outline"
        ></ion-icon>
        <span class="text-xs">New Folder</span>
      </div>
      <ion-icon
        class="text-lg text-[#949494]"
        name="options-outline"
      ></ion-icon>
    </div>
  </div>
</template>

<style scoped></style>
