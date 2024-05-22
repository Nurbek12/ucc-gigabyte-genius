import api from '.'
import { IHistory } from '@/types'

export const getAllHistories = (params: any) => api.get<{count: number, result: IHistory[]}>('/api/histories', {params})

export const getByUserId = (id: number) => api.get<{result: IHistory & { created: boolean }}>('/api/histories/'+id)

export const createHistory = (data: any) => api.post<{result: IHistory}>('/api/histories', data)