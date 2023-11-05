<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center mt-4">
    <img class="h-[28rem] w-auto" src="/404-computer.svg" alt="not found" />
    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-2xl text-primary-600 dark:text-primary-500">404 Not
      Found</h1>
    <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Whoops! That page doesn’t
      exist.</p>
    <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots
      to explore on the home page. </p>
    <router-link to="/"
      class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back
      to Homepage</router-link>
  </div>
</template>

<style scoped></style>
