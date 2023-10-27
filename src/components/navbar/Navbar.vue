<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-20">
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <button
          @click="drawer.setOpen(!drawer.isOpen)"
          aria-controls="drawer-navigation"
          class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <MenuIcon v-if="!drawer.isOpen" />
          <CloseIcon v-else />
        </button>
        <router-link to="/" class="flex items-center justify-between mr-4" :title="APP_NAME">
          <img :src="LOGO_URL" class="mr-3 h-8" alt="" />
          <span class="hidden sm:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ APP_NAME }}</span>
        </router-link>
        <div>
          <button type="button" class="hidden sm:block relative md:w-48" @click="showCommandPalette = true">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div
              class="text-left bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              Search
            </div>
          </button>
        </div>
      </div>
      <div class="flex items-center lg:order-2 relative">
        <button
          type="button"
          @click="showCommandPalette = true"
          class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <span class="sr-only">Toggle search</span>
          <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
          </svg>
        </button>
        <!--<div v-if="route.name === 'CreateNote' || route.name === 'editNote'" class="p-2 mr-1">
          <svg
            v-if="syncState === 'saved'"
            class="w-6 h-6 text-gray-500 dark:text-gray-400"
            aria-label="CloudCheckMarkIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 4.5a4.5 4.5 0 0 0-4.495 4.285a.75.75 0 0 1-.75.715H6.5a3 3 0 1 0 0 6h3.576a6.554 6.554 0 0 0-.057 1.5H6.5a4.5 4.5 0 0 1-.42-8.98a6.001 6.001 0 0 1 11.84 0a4.5 4.5 0 0 1 4.053 4.973a6.534 6.534 0 0 0-1.8-1.857A3 3 0 0 0 17.5 9.5h-.256a.75.75 0 0 1-.749-.715A4.5 4.5 0 0 0 12 4.5Zm10 12a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0Zm-2.146-2.354a.5.5 0 0 0-.708 0L15.5 17.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708Z" />
          </svg>
          <span v-else class="text-xs font-semibold text-gray-500 dark:text-gray-400">Saving...</span>
        </div>-->
        <button
          type="button"
          @click="toggleDark()"
          class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <ThemeModeIcon :is-dark="isDark" />
        </button>
        <!-- User Profile -->
        <Menu as="div">
          <MenuButton
            as="button"
            type="button"
            class="mx-3">
            <span class="sr-only">Open user menu</span>
            <AvatarRoot
              class="bg-blackA3 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <AvatarImage
                class="h-full w-full rounded-[inherit] object-cover"
                :src="user?.photoUrl"
                :alt="user?.name" />
              <AvatarFallback
                class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                :delay-ms="600">
                {{ user?.name.getInitials() }}
              </AvatarFallback>
            </AvatarRoot>
          </MenuButton>
          <!-- Dropdown menu -->
          <MenuItems
            class="absolute right-0 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown">
            <div class="py-3 px-4">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ user?.name }}</span>
              <span class="block text-sm text-gray-900 truncate dark:text-white">{{ user?.email }}</span>
            </div>
            <ul v-for="(groups, index) in menuItems" :key="index" class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
              <MenuItem v-for="item in groups" :key="item.label" as="template">
                <li>
                  <router-link
                    v-if="item.type === 'link'"
                    :to="item.to"
                    class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <component v-if="item.icon" :is="item.icon" />
                    {{ item.label }}
                  </router-link>
                  <button
                    v-if="item.type === 'button'"
                    type="button"
                    @click="item.action"
                    class="w-full text-left rounded-md block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <component v-if="item.icon" :is="item.icon" />
                    {{ item.label }}
                  </button>
                </li>
              </MenuItem>
            </ul>
          </MenuItems>
        </Menu>
      </div>
    </div>
  </nav>
  <!-- Command Palette -->
  <CommandPalette :open="showCommandPalette" @close="showCommandPalette = false" />
</template>
<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useDark, useToggle } from "@vueuse/core";
import { APP_NAME, LOGO_URL } from "@/utils/constants";
import { useDrawerStore } from "@/stores/drawer";
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { MenuIcon, CloseIcon } from "./icons";
import { AvatarFallback, AvatarImage, AvatarRoot } from "radix-vue";

const drawer = useDrawerStore();
const notesStore = useNotesStore();
const { userStore, signOut } = useLogin();
import { Icon } from '@iconify/vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
const user = computed(() => userStore.user);
const showCommandPalette = ref<boolean>(false);
// const syncState = computed(() => notesStore.syncNoteState);
const route = useRoute();

type MenuItemData = {
  type: "link" | "button";
  to?: string;
  label: string;
  icon: unknown;
  meta: string;
  iconColor: string;
  action?: () => void;
};

const menuItems: MenuItemData[][] = [
  [
    {
      type: "link",
      to: "/profile",
      label: "My profile",
      icon: null,
      meta: "",
      iconColor: "",
    },
    {
      type: "link",
      to: "/account-settings",
      label: "Account settings",
      icon: null,
      meta: "",
      iconColor: "",
    },
  ],
  [
    {
      type: "link",
      to: "/collections?type=like",
      label: "My likes",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-gray-400", icon:"mdi:heart" }),
      meta: "",
      iconColor: "",
    },
    {
      type: "link",
      to: "/collections",
      label: "Collections",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-gray-400", icon: "bxs:collection" }),
      meta: "",
      iconColor: "",
    },
    {
      type: "link",
      to: "/",
      label: "Pro version",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-primary-600 dark:text-primary-500", icon: "mdi:fire" }),
      meta: "",
      iconColor: "",
    },
  ],
  [
    {
      type: "button",
      action: () => signOut(),
      label: "Sign out",
      icon: null,
      meta: "",
      iconColor: "",
    },
  ],
];

const ThemeModeIcon = defineComponent({
  name: "ThemeModeIcon",
  props: {
    isDark: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (props.isDark) return h(MoonIcon, { class: ["h-6", "w-6"] });
      return h(SunIcon, { class: ["h-6", "w-6"] });
    };
  },
});

onMounted(() => {
  if (user.value?.theme === "dark") {
    toggleDark(true);
  } else if (user.value.theme === "light") {
    toggleDark(false);
  }
});

declare global {
  interface String {
    getInitials(glue: boolean): string;
    capitalize(): void;
  }
}

String.prototype.getInitials = function(glue){
    if (typeof glue == "undefined") {
        var glue = true;
    }

    var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    
    if (glue) {
        return initials.join('');
    }

    return  initials;
};

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};
</script>
