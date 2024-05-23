import { baseURL } from '.'
import { io } from 'socket.io-client'
import { IHistory, IDiagnosis, IRedirect } from '@/types'

const socket = io(baseURL)

export const joinToUsers = (id: number) => socket.emit('joinToUsers', id)

export const getDocrors = (cb: any) => socket.on('sendDoctorsList', cb)

export const doctorOccuppied = (doctor: number, occupied: boolean) => socket.emit('doctorOccuppied', doctor, occupied)

export const listenDoctorsOccuppied = (cb: any) => socket.on('listenDoctorsOccuppied', cb)



export const historyCreated = (history: IHistory) => socket.emit('historyCreated', history)

export const listenHistory = (cb: any) => socket.on('onHistoryCreated', cb)


export const redirectCreated = (userId: number, redirect: IRedirect) => socket.emit('redirectCreated', userId, redirect)

export const listenRedirect = (cb: any) => socket.on('onRedirectCreated', cb)


export const diagnosisCreated = (userId: number, diagnosis: IDiagnosis) => socket.emit('diagnosisCreated', userId, diagnosis)

export const listenDiagnosis = (cb: any) => socket.on('onDiagnosisCreated', cb)