<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
    title: String,
    type: String,
    description: String,
    images: String,
    timestamp: String
})

const textColor = ref<string>('gray')

</script>

<template>
    <div class="text-sm pb-4">
        <div class="py-2 bg-[#323232] px-2 rounded-lg pb-4 hover:bg-[#404040]">
            <div class="flex items-center justify-between">
                <div class="flex space-x-1">
                    <ion-icon name="document-outline"></ion-icon>
                    <span class="text-xs capitalize text-gray-300">{{ props.type }}</span>
                </div>
                <span class="text-xs text-gray-300">{{ props.timestamp }}</span>
            </div>
            <div class="flex">
                <div class="flex-1">
                    <h4 class="text-md text-white mt-2">{{ props.title }}</h4>
                    <p class="text-xs text-gray-300 mt-1">{{ props.description }}</p>
                </div>
                <div>
                    <img v-if="props.images" class="my-1 w-20 h-20 object-cover rounded-lg" :src="props.images" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>