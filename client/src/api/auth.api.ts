import api from '.'
import { IUser } from '@/types'

export const login = (data: any) => api.post<{token: string, user: IUser}>('/api/auth', data)