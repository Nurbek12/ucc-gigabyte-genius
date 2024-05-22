import cookies from 'js-cookie'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAppStore = defineStore('appStore', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('lc-user') || 'null') as IUser | null,
        token: cookies.get('lc-token') || null
    }),
    getters: {
        isLogged: state => !!state.token,
        getUser: state => state.user,
        getToken: state => state.token,
    },
    actions: {
        setToken(token: string | null) {
            this.$patch({ token })
            if(token) cookies.set('lc-token', token)
            else cookies.remove('lc-token')
        },
        setUser(user: IUser | null) {
            this.$patch({ user })
            if(user) localStorage.setItem('lc-user', JSON.stringify(user))
            else localStorage.removeItem('lc-user')
        },
        logOut() {
            this.setUser(null)
            this.setToken(null)

            window.location.href = '/'
        }
    }
})