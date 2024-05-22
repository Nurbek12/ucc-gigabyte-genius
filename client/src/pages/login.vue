<template>
    <main class="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div class="flex justify-center items-center">
            <div class="max-w-[350px] text-center w-full p-4 border rounded">
                <h1 class="text-2xl font-bold text-blue-500">Med-Care</h1>
                <form class="space-y-4 mt-4" @submit.prevent="handleLogin">
                    <app-input v-mask="'+000 00 000 00 00'" required v-model="authData.phone" placeholder="Телефон" />
                    <app-input required v-model="authData.password" placeholder="Пароль" />
                    <app-btn type="submit">Войти в систему</app-btn>
                </form>
            </div>
        </div>
        <div class="w-full h-screen hidden md:block">
            <img src="/images/auth-bg.jpg" class="w-full h-full object-cover">
        </div>
    </main>
</template>

<script setup lang="ts">
import { checkToken } from '@/api'
import { ref, reactive } from 'vue'
import { login } from '@/api/auth.api'
import { useRouter } from 'vue-router'
import AppBtn from '@/components/app-btn.vue'
import { useAppStore } from '@/store/appStore'
import AppInput from '@/components/app-input.vue'

const router = useRouter()
const loading = ref(false)
const appStore = useAppStore()
const authData = reactive({
    phone: '',
    password: ''
})

const handleLogin = async () => {
    try {
        loading.value = true
        const { data } = await login(authData)
        appStore.setToken(data.token)
        appStore.setToken(data.token)
        checkToken()
        router.push('/'+data.user.role.toLocaleLowerCase())

    } catch (error) {
        console.log(error) 
        alert('Телефон или Пароль неверный!')
    } finally {
        loading.value = false
    }
}
</script>