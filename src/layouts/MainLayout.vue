<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <div class="bg-white dark:bg-gray-800 h-screen ">
    <Navbar />

    <Sidebar />

    <main class="p-4 md:ml-64 h-auto pt-20 dark:text-white dark:bg-gray-800">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
