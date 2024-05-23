import cookies from 'js-cookie'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAppStore = defineStore('appStore', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('lc-user') || 'null') as IUser | null,
        token: cookies.get('lc-token') || null,
        doctors: new Map<number, boolean>(),
    }),
    getters: {
        isLogged: state => !!state.token,
        getUser: state => state.user,
        getToken: state => state.token,
        getDoctors: state => state.doctors
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
        },
        setDoctors(doctors: {key: number, value: boolean}[]) {
            doctors.map(d => this.doctors.set(d.key, d.value))
        },
        setDoctor(doctor: number, b: boolean | null) {
            if(b === null)
                this.doctors.delete(doctor)
            else
                this.doctors.set(doctor, b)        
        }
    }
})