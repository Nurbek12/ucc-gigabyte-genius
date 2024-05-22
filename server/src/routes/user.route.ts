import { Router } from 'express'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user.controller'

export default Router()
    .get('/', getUsers)
    .post('/', createUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
