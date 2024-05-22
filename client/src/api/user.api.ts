import api from '.'
import type { IUser } from '@/types'

export const getUsers = (params: any) => api.get<{ count: number, result: IUser[] }>('/api/users', { params })

export const createUser = (body: any) => api.post<{ result: IUser }>('/api/users', body)

export const updateUser = (id: number, body: any) => api.put<{ result: IUser }>('/api/users/'+id, body)

export const deleteUser = (id: number) => api.delete<{ result: boolean }>('/api/users/'+id)