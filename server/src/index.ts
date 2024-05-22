import cors from 'cors'
import express from 'express'
import { PORT } from './config/variables'

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'

const app = express()

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    .use('/api/auth', authRoute)
    .use('/api/users', userRoute)

    .listen(PORT, () => console.log('server started...'))