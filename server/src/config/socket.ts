import { Server, Socket } from 'socket.io'
import { History, Redirect, Diagnosis } from '@prisma/client'

const users = new Map<number, Socket>()
const doctors = new Map<number, boolean>()

export default (io: Server) => io.on('connection', socket => {
    socket.on('joinToUsers', (id: number) => {
        users.set(id, socket)
        doctors.set(id, false)
        socket.emit('sendDoctorsList', Array.from(doctors.entries(), ([key, value]) => ({ key, value })));
        io.emit('listenDoctorsOccuppied', id, false)

        socket.on('doctorOccuppied', (doctor: number, occupied: boolean) => {
            doctors.set(doctor, occupied)
            io.emit('listenDoctorsOccuppied', id, occupied)
        })

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
            doctors.delete(id)
            io.emit('listenDoctorsOccuppied', id, null)
        })
    })
})