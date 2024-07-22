<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
const userStore = useUserStore();

watchEffect(() => {
  userStore.getProfile();
});
</script>

<template>
  <div class="flex bg-white dark:bg-dark-800 h-screen overflow-x-hidden">
    <Sidebar />
    <main class="flex-1 overflow-x-auto">
      <Navbar />
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>
