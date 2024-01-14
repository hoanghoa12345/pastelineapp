<template>
  <nav class="bg-white px-4 py-2 dark:bg-dark-800 dark:border-gray-700">
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <button v-if="!state.openDrawer" @click="state.setOpenDrawer(!state.openDrawer)" class="hover:text-violet-600"><Icon class="w-5 h-5 dark:text-white" :icon="state.openDrawer ? 'ci:bar-left' : 'ci:bar-right'" /></button>
      </div>
      <div class="flex items-center lg:order-2 relative">
        <button
          type="button"
          @click="toggleDark()"
          class="hover:text-violet-600">
          <!-- <ThemeModeIcon :is-dark="isDark" /> -->
          <Icon class="dark:text-white w-5 h-5" :icon="isDark ? 'ph:moon' : 'ph:sun'" />
        </button>
        <!-- User Profile -->
        <Menu as="div">
          <MenuButton as="button" type="button" class="mx-3 z-20">
            <span class="sr-only">Open user menu</span>
            <AvatarRoot
              class="border border-gray-200 dark:border-gray-800 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="user?.photoUrl" :alt="user?.name" />
              <AvatarFallback
                class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                :delay-ms="600">
                {{ user?.name.getInitials() }}
              </AvatarFallback>
            </AvatarRoot>
          </MenuButton>
          <!-- Dropdown menu -->
          <MenuItems
            class="absolute right-0 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-dark-700 dark:divide-gray-600 rounded-xl"
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
  <CommandPalette :open="state.openSearchBar" @close="state.setOpenSearchBar(false)" />
</template>
<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useDark, useToggle } from "@vueuse/core";
import { THEME_DARK, THEME_LIGHT } from "@/utils/constants";
import { AvatarFallback, AvatarImage, AvatarRoot } from "radix-vue";

const { userStore, signOut } = useLogin();
import { Icon } from "@iconify/vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const user = computed(() => userStore.user);
const state = useAppStore()

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
      to: "/collections",
      label: "Collection",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-gray-400", icon: "bx:collection" }),
      meta: "",
      iconColor: "",
    },
    {
      type: "link",
      to: "/docs",
      label: "Docs",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-gray-400", icon: "line-md:document-twotone" }),
      meta: "",
      iconColor: "",
    },
    {
      type: "link",
      to: "/help",
      label: "Help",
      icon: h(Icon, { class: "mr-2 w-5 h-5 text-gray-400", icon: "icon-park-twotone:help" }),
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

watch(
  () => user.value,
  (value, oldValue) => {
    if (value) {
      if (user.value?.theme === THEME_DARK) {
        toggleDark(true);
      } else if (user.value.theme === THEME_LIGHT) {
        toggleDark(false);
      }
    }
  }
);

declare global {
  interface String {
    getInitials(glue: boolean): string;
    capitalize(): void;
  }
}

String.prototype.getInitials = function (glue) {
  if (typeof glue == "undefined") {
    var glue = true;
  }

  var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);

  if (glue) {
    return initials.join("");
  }

  return initials;
};

String.prototype.capitalize = function () {
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};
</script>
