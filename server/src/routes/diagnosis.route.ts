import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createDiagnosis } from '../controllers/diagnosis.controller'

export default Router()
    .post('/', authMiddleware, createDiagnosis)