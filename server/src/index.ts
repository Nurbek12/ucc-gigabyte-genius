import path from 'path'
import cors from 'cors'
import express from 'express'
import { PORT } from './config/variables'

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import historyRoute from './routes/history.route'
import redirectRoute from './routes/redirect.route'
import diagnosisRoute from './routes/diagnosis.route'

const app = express()

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

    .listen(PORT, () => console.log('server started...'))