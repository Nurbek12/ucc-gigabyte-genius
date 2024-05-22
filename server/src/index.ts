import express from 'express'
import cors from 'cors'

import userRoute from './routes/user.route'

const app = express()
const PORT = process.env.PORT || 5000

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    .use('/api/users', userRoute)

    .listen(PORT, () => console.log('server started...'))