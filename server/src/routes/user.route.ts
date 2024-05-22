import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user.controller'

export default Router()
    .get('/', authMiddleware, getUsers)
    .post('/', authMiddleware, createUser)
    .put('/:id', authMiddleware, updateUser)
    .delete('/:id', authMiddleware, deleteUser)
