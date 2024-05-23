<template>
    <div class="flex">
        <app-nav-drawer/>
        <main class="flex-1 h-[100vh] scrollbar-hide overflow-auto bg-gray-100s pl-[57px] md:pl-0">
            <router-view />
            {{ appStore.getDoctors }}
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/appStore'
import AppNavDrawer from '@/components/app-nav-drawer.vue'
import { joinToUsers, listenDoctorsOccuppied, getDocrors } from '@/api/socket'

const appStore = useAppStore()
joinToUsers(appStore.user?.id!)
listenDoctorsOccuppied((doctor: number, occupied: boolean | null) => appStore.setDoctor(doctor, occupied))
getDocrors((doctors: {key: number, value: boolean}[]) => appStore.setDoctors(doctors))
</script>