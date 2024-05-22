import axios from 'axios'
import { useAppStore } from '@/store/appStore'

export const baseURL = import.meta.env.VITE_BACKEND_URL || ''

const appStore = useAppStore()
const api = axios.create({ baseURL })

api.interceptors.response.use(
    (resp) => {
        checkToken()
        return resp
    },
    (err) => {
        if(err.response && err.response.status === 401) {
            appStore.logOut()
            return
        }
        return Promise.reject(err)
    }
)

export const checkToken = () => {
    const token = appStore.getToken
    token && (api.defaults.headers.common.Authorization = `Bearer ${token}`)
}

checkToken()

export default api