import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getAllHistories, getHistoryByUserId } from '../controllers/history.controller'

export default Router()
    .get('/', authMiddleware, getAllHistories)
    .get('/:userId', authMiddleware, getHistoryByUserId)
    // .delete('/:id', authMiddleware, deleteUser)
