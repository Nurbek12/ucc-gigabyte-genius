import api from '.'
import { IRedirect } from '@/types'

export const createRedirect = (data: any) => api.post<{result: IRedirect}>('/api/redirects', data)