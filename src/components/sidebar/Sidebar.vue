<template>
  <!-- Sidebar -->
  <aside
    class="w-72 transition-all duration-300"
    :class="state.openDrawer ? 'ml-0' : '-ml-72'">
    <nav class="flex flex-col w-72 h-full py-4  bg-[#ebf1f4] dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <ul class="flex-1">
        <div class="flex items-center justify-between mx-4">
          <router-link to="/" class="flex items-center justify-start space-x-2 px-2 gap-2" :title="APP_NAME">
            <img :src="LOGO_URL" class="h-6 w-6" alt="" />
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
        <!-- <li>
          <router-link
            to="/notes"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">All pages</span>
          </router-link>
        </li>
        <Disclosure as="li" v-slot="{ open }">
          <DisclosureButton
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-pages"
            data-collapse-toggle="dropdown-pages">
            <StarIcon
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Favorites</span>
            <svg
              aria-hidden="true"
              :class="open ? '' : '-rotate-90 transform'"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </DisclosureButton>
          <DisclosurePanel as="ul" class="py-2 space-y-2">
            <li v-if="favoriteNotes.length > 0" v-for="note in favoriteNotes" :key="note.noteId">
              <router-link
                :to="`/notes/${note.noteId}`"
                class="flex items-center p-2 pl-11 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >{{ note.title }}</router-link
              >
            </li>
            <li v-else>
              <span
                class="flex items-center p-2 pl-11 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >Not have favorite notes</span
              >
            </li>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="li" v-slot="{ open }">
          <DisclosureButton
            as="button"
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-sales"
            data-collapse-toggle="dropdown-sales">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>

            <span class="flex-1 ml-3 text-left whitespace-nowrap">Recent</span>
            <svg
              aria-hidden="true"
              :class="open ? '' : '-rotate-90 transform'"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </DisclosureButton>
          <DisclosurePanel as="ul" class="py-2 space-y-2">
            <li v-if="recentNotes.length > 0" v-for="note in recentNotes" :key="note.noteId">
              <router-link
                :to="`/notes/${note.noteId}`"
                class="flex items-center p-2 pl-11 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >{{ note.title }}</router-link
              >
            </li>
            <li v-else>
              <span
                class="flex items-center p-2 pl-11 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >Not have recent notes</span
              >
            </li>
          </DisclosurePanel>
        </Disclosure>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li>
          <router-link
            to="/docs"
            href="#"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="ml-3">Docs</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/collections"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
            <span class="ml-3">Collections</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/help"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="ml-3">Help</span>
          </router-link>
        </li> -->
      </ul>

      <div class="dark:bg-gray-800 mx-4">
        <button
          @click="state.setOpenCreate(true)"
          type="button"
          class="w-full inline-flex justify-center items-center space-x-1 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
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
                ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { APP_NAME, LOGO_URL } from "@/utils/constants";
// import { PlusIcon, StarIcon } from "@heroicons/vue/24/solid";
import { Form, Field, ErrorMessage } from "vee-validate";
// import { useDrawerStore } from "@/stores/drawer";
import { Icon } from "@iconify/vue";
import SidebarItem from "./SidebarItem.vue";

// const drawer = useDrawerStore();
const state = useAppStore();
const notes = useNotesStore();
const router = useRouter();
const route = useRoute();
// const isCreate = ref(false);
// const handleCreate = () => {
//   isCreate.value = true;
// };

const recentNotes = computed(() => (notes.notes ? notes.getRecentNotes() : []));
const favoriteNotes = computed(() => (notes.notes ? notes.getFavoriteNotes() : []));

// watch(route, () => {
//   state.setOpenDrawer(false);
// });

const validateTitle = (value) => {
  if (!value) return "Title is required";
  if (value.length < 5) return "Title is too short";
  if (value.length > 200) return "Title is too long";
  return true;
};

const onSubmit = (values) => {
  router.push({ path: "/create", query: values });
  // isCreate.value = false;
  state.setOpenCreate(false)
};
</script>
<style lang="css"></style>
