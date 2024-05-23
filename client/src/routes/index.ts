import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/appStore'

const beforeEnter = (to: any, __: any, next: any) => {
    const store = useAppStore()

    if(!store.isLogged) next('/')

    if(!to.fullPath.includes(store.user?.role?.toLocaleLowerCase())) next('/'+store.user?.role?.toLocaleLowerCase())

    else next()
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/admin', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/admin/users.vue') },
                { path: 'histories', component: () => import('@/pages/history.vue') },
            ]
        },

        { path: '/doctor', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/doctor/dashboard.vue') },
                { path: 'histories', component: () => import('@/pages/history.vue') },
            ]
        },

        { path: '/patient', beforeEnter, component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/patient/dashboard.vue') },
                { path: 'histories', component: () => import('@/pages/history.vue') },
                { path: 'qr-code', component: () => import('@/pages/patient/qr-code.vue') },
            ]
        },

        { path: '/', name: 'login', component: () => import('@/pages/login.vue') }
    ]
})