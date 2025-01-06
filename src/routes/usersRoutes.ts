import Router from 'express';
import UserController from '../controllers/userController'

const router = Router()
const userController = new UserController()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.get('/:email', userController.getUserByEmail)
router.post('/createUser', userController.createUser)
router.post('/createDummyUser', userController.createDummyUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router