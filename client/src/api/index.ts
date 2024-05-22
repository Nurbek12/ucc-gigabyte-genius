import axios from 'axios'

export const baseURL = import.meta.env.VITE_BACKEND_URL || ''
console.log(import.meta.env.VITE_BACKEND_URL);

const api = axios.create({ baseURL })

api.interceptors.response.use(
    (resp) => {
        checkToken()
        return resp
    },
    (err) => {
        if(err.response && err.response.status === 401) {
            // Logout
            return
        }
        return Promise.reject(err)
    }
)

export const checkToken = () => {
    const token = ''
    token && (api.defaults.headers.common.Authorization = `Bearer ${token}`)
}

checkToken()

export default api