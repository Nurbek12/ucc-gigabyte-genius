import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/appStore'

const beforeEnter = (_: any, __: any, next: any) => {
    const store = useAppStore()
    if(!store.isLogged) next('/login')
    else next()
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/admin', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/admin/users.vue') },
                { path: 'histories', component: () => import('@/pages/admin/histories.vue') },
            ]
        },

        { path: '/doctor', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/doctor/dashboard.vue') },
                { path: 'histories', component: () => import('@/pages/doctor/history.vue') },
            ]
        },

        { path: '/patient', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/patient/qr-code.vue') },
            ]
        },

        { path: '/', name: 'login', component: () => import('@/pages/login.vue') }
    ]
})