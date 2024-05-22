import api from '.'
import { IDiagnosis } from '@/types'

export const createDiagnosis = (data: any) => api.post<{result: IDiagnosis}>('/api/diagnosis', data)