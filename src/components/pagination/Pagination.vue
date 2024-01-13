<template>
  <div class="flex justify-center my-5">
    <button @click="goToFirstPage" :disabled="currentPage === 1" class="w-9 h-9 mr-1 p-1 disabled:text-gray-400">
      <Icon icon="radix-icons:double-arrow-left" />
    </button>

    <button @click="prevPage" :disabled="currentPage === 1" class="w-9 h-9 mr-1 p-1 disabled:text-gray-400">
      <Icon icon="radix-icons:chevron-left" />
    </button>

    <template v-for="(pageNumber, index) in pagesToShow" :key="index">
      <button
        @click="goToPage(pageNumber)"
        :class="pageNumber === currentPage ? 'bg-blue-500 text-white' : 'p-1'"
        class="w-9 h-9 border rounded mr-1">
        {{ pageNumber }}
      </button>
    </template>

    <button @click="nextPage" :disabled="currentPage === totalPages" class="w-9 h-9 mr-1 p-1 disabled:text-gray-400">
      <Icon icon="radix-icons:chevron-right" />
    </button>

    <button @click="goToLastPage" :disabled="currentPage === totalPages" class="w-9 h-9 p-1 disabled:text-gray-400">
      <Icon icon="radix-icons:double-arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  pageStart: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:page"]);


const totalPages = computed(() => {
  return Math.ceil(props.total / props.limit);
});

const currentPage = ref(props.pageStart);
const maxButtons = 5;

const pagesToShow = computed(() => {
  const pages = [];
  pages.push(1);

  if (totalPages.value <= maxButtons) {
    // Show all pages if less than max
    for (let i = 2; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Show first, previous, current, next, and last

    if (currentPage.value > 1) {
      pages.push("...");
    }

    let lowerLimit = Math.max(2, currentPage.value - 1);
    let upperLimit = Math.min(totalPages.value - 1, currentPage.value + 1);

    for (let i = lowerLimit; i <= upperLimit; i++) {
      pages.push(i);
    }

    if (currentPage.value < totalPages.value - 1) {
      pages.push("...");
    }

    pages.push(totalPages.value);
  }


  return pages;
});

const goToFirstPage = () => {
  currentPage.value = 1;
  emit("update:page", 1);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("update:page", currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit("update:page", currentPage.value);
  }
};

const goToLastPage = () => {
  emit("update:page", totalPages.value);
};

const goToPage = (page) => {
  currentPage.value = page;
  emit("update:page", page);
};
</script>
