import { Router, Request, Response } from 'express'
import { 
    getUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
} from '../controllers/users.controllers'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    getUsersController(req, res)
})

router.get('/:id', (req: Request, res: Response) => {
    getUserByIdController(req, res)
})

router.post('/', (req: Request, res: Response) => {
    createUserController(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    updateUserController(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    deleteUserController(req, res)
})

export default router