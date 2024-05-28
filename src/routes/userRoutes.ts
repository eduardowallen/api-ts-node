import { Router, Request, Response } from 'express'
import UserController from '../controllers/userController'
import { validateUser } from '../utils/users.validators'

const router = Router()
const userController = new UserController()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', validateUser, createUserController)
router.put('/:id', validateUser, updateUserController)
router.delete('/:id', deleteUserController)

export default router