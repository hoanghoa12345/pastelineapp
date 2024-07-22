<template>
  <aside
    class="w-72 transition-all duration-300 h-full"
    :class="clsx(state.openDrawer ? 'ml-0' : '-ml-72', isMobile && 'absolute')">
    <nav class="flex flex-col w-72 h-full py-4  bg-[#ebf1f4] dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700">
      <ul class="flex-1">
        <div class="flex items-center justify-between mx-4">
          <router-link to="/" class="flex items-center justify-start space-x-2 px-2 gap-2" :title="APP_NAME">
            <img :src="logo" class="h-6 w-6" alt="" />
            <span class="text-xl font-medium whitespace-nowrap dark:text-white">{{ APP_NAME }}</span>
          </router-link>

          <div class="flex space-x-2">
            <button class="hover:text-violet-600"><Icon class="w-5 h-5 dark:text-white" icon="ph:bell" /></button>
            <button @click="state.setOpenSearchBar(true)" class="hover:text-violet-600">
              <Icon class="w-5 h-5 dark:text-white" icon="ion:search-outline" />
            </button>
            <button @click="state.setOpenDrawer(!state.openDrawer)" class="hover:text-violet-600">
              <Icon class="w-5 h-5 dark:text-white" :icon="state.openDrawer ? 'ci:bar-left' : 'ci:bar-right'" />
            </button>
          </div>
        </div>
        <div class="py-3 border-b border-gray-300 dark:border-gray-600">
          <sidebar-item to="/recent" name="Recent" icon="fluent-mdl2:recent" />
          <sidebar-item to="/" name="Ideas" icon="lucide:pen-line" />
        </div>
        <div class="mx-4 my-4">
          <div class="flex items-center justify-between">
            <h2 class="font-medium dark:text-white">My Workspace</h2>
            <div>
              <button @click="state.setOpenCreate(true)" class="w-8 h-8 bg-violet-600 rounded-full flex justify-center items-center group"><Icon class="w-5 h-5 text-gray-300 group-hover:scale-110" icon="ic:baseline-plus" /></button>
            </div>
          </div>
        </div>
        <sidebar-item to="/notes" name="All pages" icon="iconoir:page-edit" />
        <sidebar-item to="/collections" name="Collections" icon="bx:collection" />        
        <sidebar-item to="/collections?type=favorite" name="Favorites" icon="ph:bookmark" />        
        <sidebar-item to="/collections?type=pinned" name="Pinned" icon="tabler:pinned" />        
        <sidebar-item to="/collections?type=deleted" name="Trash" icon="ph:trash" />   
      </ul>

      <div class="dark:bg-dark-800 mx-4">
        <button
          @click="state.setOpenCreate(true)"
          type="button"
          class="w-full inline-flex justify-center items-center space-x-1 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-dark-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <Icon class="w-4 h-4" icon="mdi:plus" />
          <span>Create</span>
        </button>
      </div>
    </nav>
  </aside>
  <Modal :open="state.openCreate" @closeModal="state.setOpenCreate(false)">
    <template #title> Create new page </template>
    <template #content>
      <Form @submit="onSubmit" v-slot="{ errors }">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page Title</label>
          <Field
            type="text"
            name="title"
            id="title"
            placeholder="Enter page title"
            :rules="validateTitle"
            class="border sm:text-sm rounded-lg block w-full p-2.5"
            label="Page title"
            :class="
              errors?.title
                ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-dark-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-dark-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            " />
          <ErrorMessage name="title" class="text-red-500 text-sm" />
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create
            </button>
          </div>
        </div>
      </Form>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { APP_NAME, LOGO_URL } from "@/utils/constants";
import { Form, Field, ErrorMessage } from "vee-validate";
import { Icon } from "@iconify/vue";
import SidebarItem from "./SidebarItem.vue";
import logo from '@/assets/logo.png'
import { useMediaQuery } from "@vueuse/core";
import {clsx} from 'clsx'

const state = useAppStore();
const notes = useNotesStore();
const router = useRouter();
const isMobile = useMediaQuery("(max-width: 767px)");

const recentNotes = computed(() => (notes.notes ? notes.getRecentNotes() : []));
const favoriteNotes = computed(() => (notes.notes ? notes.getFavoriteNotes() : []));

const validateTitle = (value) => {
  if (!value) return "Title is required";
  if (value.length < 5) return "Title is too short";
  if (value.length > 200) return "Title is too long";
  return true;
};

const onSubmit = (values) => {
  router.push({ path: "/create", query: values });
  state.setOpenCreate(false)
};

watch(
  () => isMobile.value,
  (value) => {
    if (value) {
      state.setOpenDrawer(false)
    } else {
      state.setOpenDrawer(true)
    }
  }
)
</script>
<style lang="css"></style>
