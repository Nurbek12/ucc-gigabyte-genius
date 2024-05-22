import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createRedirect } from '../controllers/redirect.controller'

export default Router()
    .post('/', authMiddleware, createRedirect)