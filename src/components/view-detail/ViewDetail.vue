<script setup lang="ts">
import { ref } from 'vue'
import ItemList from './ItemList.vue'
const pageData = {
    title: 'Inbox',
    listItems: [
        {
            name: '',
            type: 'NOTE',
            description: 'Save notes fast, easy, good!',
            timestamp: '20 min ago'
        },
        {
            name: 'Video game character design',
            type: 'LINK',
            images: 'https://picsum.photos/200/200',
            description: 'Some character design I\'ve did for Coven by Tapteek. You are ready to cast your first spell.',
            timestamp: '10 min ago'
        },
        {
            name: 'Cyber Dude: Dev Tycoon Gameplay',
            type: 'YOUTUBE',
            images: 'https://picsum.photos/200/200',
            description: 'Cyber Dude is new mobile Idle game',
            timestamp: '3 min ago'
        },
        {
            name: '',
            type: 'NOTE',
            description: 'A place that makes it easy to save notes every day!',
            timestamp: '2 min ago'
        },
        {
            name: 'Pasteline-App',
            type: 'LINK',
            description: 'https://dribbble.com/shots/16780528-Pasteline-App',
            timestamp: 'just finished'
        },
    ]
}
</script>

<template>
    <div class="bg-primary h-full w-full px-8 py-6">
        <div class="flex space-x-4 absolute right-2 top-2">
            <ion-icon name="cloud-done-outline" class="text-md md:text-lg text-[#949494]"></ion-icon>
            <ion-icon name="search-outline" class="text-md md:text-lg text-[#949494]"></ion-icon>
        </div>

        <h1 class="text-2xl font-semibold text-gray-50 py-2">{{ pageData.title }}</h1>
        <ItemList :items="pageData.listItems" />
    </div>
</template>

<style scoped></style>