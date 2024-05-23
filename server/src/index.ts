import path from 'path'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import SocketConf from './config/socket'
import { PORT } from './config/variables'

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import historyRoute from './routes/history.route'
import redirectRoute from './routes/redirect.route'
import diagnosisRoute from './routes/diagnosis.route'

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

SocketConf(io)

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, '..', 'uploaded')))

    .use('/api/auth', authRoute)
    .use('/api/users', userRoute)
    .use('/api/histories', historyRoute)
    .use('/api/redirects', redirectRoute)
    .use('/api/diagnosis', diagnosisRoute)

server
    .listen(PORT, () => console.log('server started...'))