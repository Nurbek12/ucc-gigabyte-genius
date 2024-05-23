import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getAllHistories, getHistoryByUserId, getHistoryById } from '../controllers/history.controller'

export default Router()
    .get('/', authMiddleware, getAllHistories)
    .get('/user/:id', authMiddleware, getHistoryByUserId)
    .get('/id/:id', authMiddleware, getHistoryById)
    // .delete('/:id', authMiddleware, deleteUser)
