import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))


    .listen(PORT, () => console.log('server started...'))