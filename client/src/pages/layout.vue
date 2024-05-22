<template>
    <div class="flex">
        <app-nav-drawer/>
        <main class="flex-1 h-[100vh] scrollbar-hide overflow-auto bg-gray-100s pl-[57px] md:pl-0">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import AppNavDrawer from '@/components/app-nav-drawer.vue'
</script>