import { Server, Socket } from 'socket.io'
import { History, Redirect, Diagnosis } from '@prisma/client'

const users = new Map<number, Socket>()

export default (io: Server) => io.on('connection', socket => {
    socket.on('joinToUsers', (id: number) => {
        users.set(id, socket)


        socket.on('historyCreated', (history: History) => {
            users.get(history.patientId)?.emit('onHistoryCreated', history)
        })

        socket.on('redirectCreated', (userId: number, redirect: Redirect) => {
            users.get(redirect.fromDoctorId)?.emit('onRedirectCreated', redirect)
            users.get(userId)?.emit('onRedirectCreated', redirect)
        })

        socket.on('diagnosisCreated', (userId: number, diagnosis: Diagnosis) => {
            users.get(userId)?.emit('onDiagnosisCreated', diagnosis)
        })

        socket.on('disconnect', () => {
            users.delete(id)
        })
    })
})