<script setup lang="ts">
import {ref} from 'vue'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar.vue';
import ViewDetail from '../../components/view-detail/ViewDetail.vue'
import AddNote from '../../components/add-note/AddNote.vue'
</script>

<template>
    <div class="flex w-full h-screen">
        <LeftSidebar/>
        <div class="relative w-full">
            <ViewDetail/>
            <AddNote />
        </div>
    </div>
</template>

<style scoped></style>
