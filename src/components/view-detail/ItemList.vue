<script setup lang="ts">
import { defineProps, ref } from 'vue'
import CardItem from './CardItem.vue';
const props = defineProps({
    'items': {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="text-gray-50 overflow-y-auto h-[80vh] scroll-">
        <CardItem v-for="item in props.items" :title="item.name" :description="item.description" :type="item.type" :images="item.images" :timestamp="item.timestamp" />
    </div>
</template>

<style scoped></style>