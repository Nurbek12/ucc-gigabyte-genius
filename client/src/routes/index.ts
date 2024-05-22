import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'index', component: () => import('@/pages/profile.vue') },
        { path: '/admin', component: () => import('@/pages/layout.vue'),
            children: [
                { path: '', component: () => import('@/pages/admin/users.vue') },
                { path: 'histories', component: () => import('@/pages/admin/histories.vue') },
            ]
        },

        { path: '/login', name: 'login', component: () => import('@/pages/login.vue') }
    ]
})