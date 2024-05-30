import { Router, Request, Response } from 'express'
import UserController from '../controllers/userController'
import { validateUser } from '../utils/users.validators'

const router = Router()
const userController = new UserController()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router